import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const LoginUser = ({setUser, setPosts}) => {
    const pw1Ref = useRef()
    const emailRef = useRef()
    const [stayLogged, setStayLogged] = useState(false)
    const nav = useNavigate()


    async function registerUser() {
        const item = {

            email: emailRef.current.value,
            pw1: pw1Ref.current.value,
            stayLogged: stayLogged


        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        }


        const response = await fetch(`http://localhost:4000/login`, options)
        const data = await response.json()
        if (data.success) {
            alert("Success! You've Logged In")
            nav("/")
            setUser(data.user)
            setPosts(data.posts)
            if(stayLogged){
                localStorage.setItem('userSecret', data.user.secret);
            }else{
                localStorage.setItem('userSecret', null);
            }

        } else {
            alert(data.errorMessage)
        }

    }

    return (
        <div>
            <div className='d-flex column m-20 center w-200'>

                <input ref={emailRef} defaultValue="asd@asd.lt" type="text"/>
                <input defaultValue="asdasd" ref={pw1Ref} type="text"/>
                Stay Logged In
                <input onChange={() => setStayLogged(!stayLogged)} type="checkbox"/>

                <button onClick={registerUser}>Login</button>

            </div>
        </div>
    );
};

export default LoginUser;