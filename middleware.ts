"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

const Middleware: React.FC=()=>{
    const router=useRouter();

    useEffect(()=>{
        const token=localStorage.getItem("token");
        //token ı test et daha sonra doğru mu diye ondan sonra buraya aktar
        if(!token) {
            router.push("/user/signin")
        }

    },[router]);

    return null;
}

export default Middleware;