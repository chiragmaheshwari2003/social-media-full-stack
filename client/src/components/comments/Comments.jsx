import './comments.scss';

import React, { useContext, useState } from 'react';
import {AuthContext} from '../../context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';

const Comments = ({postId}) => {
    const {currentUser} = useContext(AuthContext);
    // const comments = [
    //     {
    //         id:1,
    //         desc: 'Amet consectetur adipisicing elit. Hic animi omnis unde sequi neque corporis modi laudantium alias quae iure.',
    //         userId:1,
    //         name: 'Amit Shukla',
    //         profilePic: 'https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //     },
    //     {
    //         id:2,
    //         desc: 'Amet consectetur adipisicing elit. Hic animi omnis unde sequi neque corporis modi laudantium alias quae iure.',
    //         userId:2,
    //         name: 'Akshay Batra ',
    //         profilePic: 'https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //     },
    //     {
    //         id:3,
    //         desc: 'Amet consectetur adipisicing elit. Hic animi omnis unde sequi neque corporis modi laudantium alias quae iure.',
    //         userId:3,
    //         name: 'Jeet Sharma ',
    //         profilePic: 'https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //     },
        
    // ]
    const [desc, setDesc] = useState("");
    const {isLoading , error, data} = useQuery({
        queryKey: ["comments"],
        queryFn: () =>
          makeRequest.get("/comments?postId="+postId).then(res =>{
            // console.log(res);
            return res.data;
          })
      });

      const queryClient = useQueryClient();

  const mutation = useMutation(
    {
      mutationFn : (newComment) => {
          return makeRequest.post("/comments", newComment);
        },
    
      onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["comments"]);
        },
    });

  const handleClick = async (e) => {
    e.preventDefault();

    mutation.mutate({ desc,postId });
    setDesc(""); 
  };


  return (
    <div className='comments'>
        <div className="write">
            <img src={currentUser.profilePic} />
            <input type='text' 
             value= {desc} 
             placeholder='Write a comment'
             onChange={(e) => setDesc(e.target.value)}
            />
            
            <button onClick={handleClick}>send</button>
        </div>
        {isLoading ? "Loading..." :
            data.map((comment)=>(
            <div className="comment">
                <img src={comment.profilePic} />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">{moment(comment.createdAt).fromNow()}</span>

            </div>
        ))}
    </div>
  )
}

export default Comments