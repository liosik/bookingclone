import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";

const AddPost = ({setPosts}) => {
    const cityRef = useRef()
    const priceRef = useRef()
    const photoRef = useRef()
    const nav = useNavigate()
    async function addPost() {
        const item = {

            city: cityRef.current.value,
            price: priceRef.current.value,
            photo: photoRef.current.value,
            reserved: [],
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        }


        const response = await fetch(`http://localhost:4000/addpost`, options)
        const data = await response.json()
        if (data.success) {
            alert("Success! You've Added Post")
            setPosts(data.posts)
            nav('/')
        } else {
            alert(data.errorMessage)
        }

    }

    return (
        <div className='d-flex column space-a'>
            <input ref={cityRef} defaultValue='City' type="text"/>
            <input ref={photoRef} defaultValue='https://picsum.photos/200/300' type="text"/>
            <input ref={priceRef} placeholder='Price' type="number"/>
            <button onClick={addPost}>Add Post</button>
        </div>
    );
};

export default AddPost;