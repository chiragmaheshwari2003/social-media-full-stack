import './stories.scss'

import React, { useContext } from 'react';
import {AuthContext} from '../../context/authContext'

const Stories = () => {
    const { currentUser } = useContext(AuthContext);
    const stories = [
        {
            id:1,
            name: "Harsh Suthar",
            img: 'https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id:2,
            name: "Harsh Suthar",
            img: 'https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id:3,
            name: "Harsh Suthar",
            img: 'https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
    ];

  return (
    <div className='stories'>
        <div className="story">
                <img src={currentUser?.profilePic} />
                <span>{currentUser?.name}</span>
                <button>+</button>
        </div>
        {stories.map((story,idx)=>(
            <div className="story" key={story.id}>
                <img src={story.img} />
                <span>{story.name}</span>
            </div>
        )
        )}
    </div>
  )
}

export default Stories