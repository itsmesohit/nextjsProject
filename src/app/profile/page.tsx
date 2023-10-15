"use client"
import axios from "axios"
import toast from "react-hot-toast"
import {useState} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link"


export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState('nothing');
    const logout = async () =>{
        try{
            const response = await axios.get("/api/users/logout");
            console.log("Logout Success", response.data);
            toast.success("Logout Success");
            router.push("/login");
        }catch(e:any){
            console.log("Logout Failed",e.message);
            toast.error(e.message);
        }
    }
    const getUserDetails = async () =>{
        try{
            const response = await axios.get("/api/users/me");
            console.log("User Details", response.data);
            setData(response.data.data._id);

        }catch(e:any){
            console.log("User Details Failed",e.message);
            toast.error(e.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 >Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <h2 className="p-3 rounded-lg bg-green-500">{data === 'nothing'?"Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button className="p-2 border-2 bg-blue-900 border-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
             onClick={logout}>Logout</button>


<button className="p-2 border-2 border-black rounded-md bg-green-900 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
             onClick={getUserDetails}>Get User Data</button>
        </div>
    )
}
