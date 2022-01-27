import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost]  = useState({})
    const [comments, setComments]  = useState([])
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const responce = await PostService.getById(id)
        setPost(responce.data)
    }) 
    const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
        const responce = await PostService.getCommentsByPostId(id)
        setComments(responce.data)
    }) 

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return(
    <div>
        <h1>Post № {params.id}</h1>
        {isLoading
            ? <Loader/>
            : <div>{post.id}. {post.title}</div>
        }
        <h1>Comments</h1>
        {isComLoading
            ? <Loader/>
            : <div>
                {comments.map(comm => 
                    <div key={comm.id} style={{marginTop: 15}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}
            </div>
        }   
    </div>
    )
}

export default PostIdPage;