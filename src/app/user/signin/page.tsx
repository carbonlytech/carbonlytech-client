import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";

const Signin: React.FC =()=>{

    const [userData,setUserData]=useState({
        email: "",
        password: "",
    });

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit=async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter your email address" onChange={handleChange} name="email"/>
                <input type="password" placeholder="Enter your password" onChange={handleChange} name="password" />

                <button type="submit">Continue</button>
            </form>

            <Link href={"/user/signup"}>
                If you dont have an account.
            </Link>
        </div>
    )

}


export default Signin;