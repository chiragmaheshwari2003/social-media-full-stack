import './post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link } from "react-router-dom";
import moment from "moment"
import { makeRequest } from '../../axios';



import React, { useContext, useState } from 'react'
import Comments from '../comments/Comments';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../context/authContext';

const Post = ({ post }) => {
    
    const { currentUser } = useContext(AuthContext);

    const [commentOpen,setCommentOpen] = useState(false);
    const [menuOpen,setMenuOpen] = useState(false);

    // const [liked, setLiked] = useState(false); // alternative below
    
    const {isLoading , error, data} = useQuery({
        queryKey: ["likes",post.id],
        queryFn: () =>
          makeRequest.get("/likes?postId="+post.id).then(res =>{
            // console.log(res);
            // console.log(res.data);
            
            return res.data;
          })
      });

    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn : (liked) => {
            if(liked){
                return makeRequest.delete("/likes?postId="+post.id );
            }
            return makeRequest.post("/likes", {postId : post.id});
        },
        
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["likes"]);
            },
        });
    
    const deleteMutation = useMutation(
        {
        mutationFn : (postId) => {
            // console.log(postId);
            return makeRequest.delete("/posts/"+postId);
        },
        
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["posts"]);
            },
        });


    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id))
        // console.log(data.includes(currentUser));
    }

    const handleDelete = () =>{
        deleteMutation.mutate(post.id);
    }


    // console.log(post);
    return (
        <div className='post'>
            <div className="container">

                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} />
                        <div className="details">
                            <Link to={`profile/${post.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className='name'>{post.name}</span>
                            </Link>
                            <span className='date'>{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizOutlinedIcon onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && post.userId === currentUser.id && (
                        <button onClick={handleDelete}>delete</button>
                    )}
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={"./upload/"+post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item" >
                        { isLoading ? 0 : 
                        data.includes(currentUser.id)?
                         <FavoriteOutlinedIcon style={{color : "red"}} onClick= {handleLike}/>
                          : <FavoriteBorderOutlinedIcon onClick = {handleLike}/>}
                        {isLoading ? 0 : data.length} Likes
                    </div>
                    <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        12 Comments
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id}/>}
            </div>
        </div>
    )
}

export default Post