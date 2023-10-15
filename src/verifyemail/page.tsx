"use client"
import axios from "axios"
import toast from "react-hot-toast"
import React, {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link"

export default function VerifyEmailPage() {

    const [token, setToken] = useState('');

    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    
    const verifyEmail = async () =>{
        try{
            const response = await axios.post(`/api/users/verifyemail/${token}`);
            console.log("Verify Email Success", response.data);
            toast.success("Verify Email Success");
            setVerified(true);
        }catch(e:any){
            console.log("Verify Email Failed",e.message);
            toast.error(e.message);
            setError(true);
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    },[]);

    useEffect(()=>{
        if(token.length>0){
            verifyEmail();
        }
    },[token]);

    return (
        <div className="flex flex-col items-center justifiy-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black"> {token? `${token}` :"No Token" } </h2>


            
           {verified && (
                <div className="p-2 bg-green-500 text-black">
                     <h2>Email Verified</h2>
                     <Link href="/login">Login</Link>
                </div>
            
           )}
           {error && (
                <div className="p-2 bg-green-500 text-black">
                     <h2 className="text-4xl ">Error Verificatiol Failed</h2>
                </div>
            
           )}

        </div>
    )
}