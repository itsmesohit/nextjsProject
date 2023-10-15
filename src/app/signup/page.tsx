"use client"
import Link from "next/link"
import React, {useEffect} from "react"
import {useRouter} from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import { set } from "mongoose"


export default function SingupPage() {
    const router = useRouter()

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success", response.data);
            toast.success("Signup Success");
            router.push("/login");


        }catch(e:any){
            console.log("Signup Failed",e.message);
            toast.error(e.message);
        }finally
        {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email && user.password && user.username) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

    }, [user]);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 >{loading ? "Processing" : "Signup"}</h1>
          <hr/>

            <label htmlFor="username">Username</label>
            <input className="p-2 border-2 border-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black" placeholder="Username"
             type="text" name="username" id="username" onChange={(e) => setUser({...user, username: e.target.value})}/>

           <label htmlFor="email">Email</label>
            <input className="p-2 border-2 text-black border-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Email"
             type="text" name="email" id="email" onChange={(e) => setUser({...user, email: e.target.value})}/>

            <label htmlFor="password">Password</label>
            <input className="p-2 border-2 text-black border-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="password"
             type="password" name="password" id="password" onChange={(e) => setUser({...user, password: e.target.value})}/>

            <button onClick={onSignup}
            className="p-2 border-2 border-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600">{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit Login Page</Link>

      </div>
    )
  }