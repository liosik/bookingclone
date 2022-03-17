import React from 'react';
import PostCard from "../components/PostCard";

const AllPosts = ({posts, user}) => {
    return (
        <div className='d-flex wrap'>
            {posts.map((x,i) => <PostCard user={user} post={x} key={i}/>)}
        </div>
    );
};

export default AllPosts;