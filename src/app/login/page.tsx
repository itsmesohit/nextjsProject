"use client"
import Link from "next/link"
import React, {useEffect} from "react"
import {useRouter} from "next/navigation"
import axios from "axios"
import { on } from "events"
import toast from "react-hot-toast"


export default function LoginPage() {
  const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin= async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Success", response.data);
            toast.success("Login Success");
            router.push("/profile");

        }catch(e:any){
            console.log("Login Failed",e.message);
            toast.error(e.message);
        }finally
        {
            setLoading(false)
        }
    }
    useEffect (() => {
        if (user.email && user.password) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

    }, [user]);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 >{loading?"Processing" : "Login"}</h1>
          <hr/>
           <label htmlFor="email">Email</label>
            <input className="p-2 text-black border-2 border-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Email"
             type="text" name="email" id="email" onChange={(e) => setUser({...user, email: e.target.value})}/>

            <label htmlFor="password">Password</label>
            <input className="p-2 text-black border-2 border-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="password"
             type="password" name="password" id="password" onChange={(e) => setUser({...user, password: e.target.value})}/>

            <button onClick={onLogin}
            className="p-2 border-2 border-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600">{buttonDisabled ?"NO Login":"Login" }</button>
            <Link href="/signup">Visit Signup Page</Link>
      </div>
    )
  }