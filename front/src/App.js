import "./App.css"
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "./App.css"
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";
import AddPost from "./pages/AddPost";
import AllPosts from "./pages/AllPosts";
import SinglePost from "./components/SinglePost";

const App = () => {
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])

    async function check() {
        const item = {
            userSecret: localStorage.getItem('userSecret')
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        }


        const response = await fetch(`http://localhost:4000/check`, options)
        const data = await response.json()
        if (data.success) {
            alert("You Logged In")
            setUser(data.user)
            setPosts(data.posts)
        } else {
            alert(data.errorMessage)
        }

    }



    useEffect(()=>{
        check()
    }, [])
    return (
        <div>
            <div className='container d-flex space-e a-center column'>
                <Router>
                    <div className='d-flex space-e a-center'>
                        <Link to='/'><button>All Posts</button></Link>
                        <Link to='/register'>
                            <button>Register</button>
                        </Link>
                        <Link to='/login'>
                            <button>Login</button>
                        </Link>
                        {user && user.isAdmin && <Link to='/addpost'>
                                <button>Add Post</button>
                            </Link>}
                        {user && <h3>{user.email}</h3>}
                    </div>
                    <Routes>
                        <Route path="/" element={<AllPosts posts={posts} user={user}/>}/>
                        <Route path="/register" element={<RegisterUser/>}/>
                        <Route path="/login" element={<LoginUser setPosts={setPosts} setUser={setUser}/>}/>
                        <Route path="/addpost" element={<AddPost setPosts={setPosts}/>}/>
                        <Route path="/singlepost/:id" element={<SinglePost setPosts={setPosts} posts={posts} user={user}/>}/>

                    </Routes>
                </Router>
            </div>
        </div>
    );
};

export default App;