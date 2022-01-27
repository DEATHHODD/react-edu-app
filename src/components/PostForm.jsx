import React from "react";
import { useState} from "react/cjs/react.development";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const PostForm = ({create}) => {

    //Получение данных с помощью управляемого инпута
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
          ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
    }

    return(
        <form>
        {/* Controlled component */}
        <MyInput 
          type="text"
          placeholder="Post name"
          value = {post.title}
          onChange = {e => setPost({...post, title: e.target.value})}/>
       {/* Not-controlled component */}
       {/* ref={bodyInputRef} */}
        <MyInput 
          type="text" 
          placeholder="Post description"
          value={post.body}
          onChange= {e => setPost({...post, body: e.target.value})}
          />
        <MyButton onClick={addNewPost}>Create post</MyButton>
      </form>
    )
}

export default PostForm;