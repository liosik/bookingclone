import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const RegisterUser = () => {
    const pw1Ref = useRef()
    const pw2Ref = useRef()
    const emailRef = useRef()
    const isAdminRef = useRef()
    const nav = useNavigate()




    async function registerUser() {
        const item = {

            email: emailRef.current.value,
            pw1: pw1Ref.current.value,
            pw2: pw2Ref.current.value,
            isAdmin: isAdminRef.current.checked

        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        }


        const response = await fetch(`http://localhost:4000/register`, options)
        const data = await response.json()
        if (data.success) {
            alert("Success! You've Added a User")
            nav("/login")
        } else {
            alert(data.errorMessage)
        }

    }

    return (
        <div className='d-flex column m-20 center w-200'>

            <input ref={emailRef} defaultValue="asd@asd.lt" type="text"/>
            <input defaultValue="asdasd" ref={pw1Ref} type="text"/>
            <input defaultValue="asdasd" ref={pw2Ref} type="text"/>
            Is Admin
            <input ref={isAdminRef} type="checkbox"/>

            <button onClick={registerUser}>Register</button>

        </div>
    );
};

export default RegisterUser;