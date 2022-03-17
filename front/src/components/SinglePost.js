import React from 'react';
import {useParams} from "react-router-dom";
import MyCalendar from "./MyCalendar";

const SinglePost = ({posts, user, setPosts}) => {
    const {id} = useParams()
    const post = posts.find(x => x._id === id)
    return (
        <div>
            <h1>{post.city}</h1>
            <h1>{post.price}€</h1>
            <img className='h-200' src={post.photo} alt=""/>
            <MyCalendar user={user} setPosts={setPosts} post={post}/>
        </div>
    );
};

export default SinglePost;