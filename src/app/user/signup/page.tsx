"use client";

import { signUpUser } from "@/app/api/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const Signup: React.FC=()=>{

    const [errors,setErrors]=useState<string[]>([]);
    const [success,setSuccess]=useState<string>("");

    const router=useRouter();

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
    };
    
    const handleSubmit=async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await signUpUser(userData,router,setSuccess,setErrors);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>

                {errors.length>0 && (
                    <div className="mb-4">
                        <ul className="text-red-500">
                            {errors.map((error,index)=>(
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {success && (
                    <div className="mb-4">
                        <div>{success}</div>
                    </div>
                )}

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