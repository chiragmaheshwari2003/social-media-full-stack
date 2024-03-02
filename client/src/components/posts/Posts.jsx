import Post from '../post/Post';
import './posts.scss'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
const Posts = ({userId}) => {
    const posts = []
    // console.log(userId);
    const {isLoading , error, data} = useQuery({
        queryKey: ["posts"],
        queryFn: () =>
          makeRequest.get("/posts?userId="+userId).then(res =>{
            // console.log(res);
            return res.data;
          })
      });
      // console.log(data);
  return (
    <div className='posts'>
        {error ?
         "Something went wrong"
         :isLoading ? 
         "Loading " :
          data.map((post)=>(
          <Post post = {post} key={post.id}/>
        ))}
    </div>
  )
}

export default Posts