'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
    const router = useRouter()
    const [data,setData] = useState(null)

    const getUserDetails = async ()=>{
        try {
         const response = await axios.get(`/api/user`)
         console.log(response)
         const data = response.data.user
         setData(data._id)   
        } catch (error:any) {
            toast.error(error.message)
            console.log(`Error from profile page`,error.message)

        }
    }
    const signout = async ()=>{
        try {
            const response = await axios.get(`/api/auth/signout`)
            console.log(`Response from signout function`,response.data)
            toast.success(`signout done`)
            router.push('/signin')
        } catch (error:any) {
            toast.error(error.message)
            console.log(`Error from profile page`,error.message)
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Toaster/>
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={signout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button>
 
    </div>
  );
};

export default Profile;
