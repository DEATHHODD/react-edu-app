import React, { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import { usePosts } from "../hooks/usePosts";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import PostService from "../API/PostService";
import Loader from "../UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import {getPageCount} from "../utils/pages"
import Pagination from "../UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../UI/select/MySelect";

function Posts() {
  // Получение данных с помощью неуправляемого инпута (Используя хук "useRef" так же необходимо обернуть компонент в функцию соответствующим образом)
  //const bodyInputRef = useRef()

  //Хук изменения состояния компонента. Если компонент изменился - перерисовываем его
  const [posts, setPosts] = useState([
    // {id: 1, title: 'JavaScript aa', body: 'Post descriptions aa'},
    // {id: 2, title: 'JavaScript hh', body: 'Post descriptions vv'},
    // {id: 3, title: 'JavaScript zz', body: 'Post descriptions cc'}
  ])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const lastElement  = useRef()

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const [fetchPosts, isPostLoading] = useFetching( async (limit, page) => {
    const responce = await PostService.getAll(limit, page)
    setPosts([...posts, ...responce.data])
    const totalCount = responce.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1)
  })

  useEffect( () => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) =>{
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Create</MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect 
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Count elements on page"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'ALL posts'},
        ]}  
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of Post"/>
      <div ref={lastElement} style={{height: 20, background: 'red'}}/>
      {isPostLoading &&
         <div style={{display: 'flex' , justifyContent: 'center', marginTop: 50}}><Loader/></div> 
      }
      <Pagination 
        totalPages={totalPages} 
        page={page} 
        changePage={changePage}/>
    </div>
  );
}

export default Posts;
