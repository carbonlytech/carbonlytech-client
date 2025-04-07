"use client";

import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";

const Signup: React.FC=()=>{

    const [userData,setUserData]=useState({
        businessName: "",
        email: "",
        password: "",
    });

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
        console.log({userData});
    };
    
    const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>

                <input type="text" placeholder="Enter your business name" onChange={handleChange} name="businessName"/>
                <input type="email" placeholder="Enter your email address" onChange={handleChange} name="email" />
                <input type="password" placeholder="Enter your password" onChange={handleChange} name="password"/>

                <button type="submit">Submit</button>

            </form>

            <Link href={"/user/signin"}>
                If you already have an account.
            </Link>
        </div>
    )

}

export default Signup;