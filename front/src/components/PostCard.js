import React from 'react';
import {useNavigate} from "react-router-dom";

const PostCard = ({post, user}) => {
    const nav = useNavigate()
    const redirect = () => {
        if(!(user.isAdmin)) nav(`/singlepost/${post._id}`)
    }


    return (
        <div className='d-flex column space-a card a-center'>
            <h1>{post.city}</h1>
            <img onClick={redirect} className='roundImg' src={post.photo} alt=""/>
            <h2>{post.price}€</h2>

        </div>
    );
};

export default PostCard;