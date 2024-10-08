import { useState } from "react"
import { useAuthContext } from "../AuthContext/authContext"
import {toast } from 'react-hot-toast'
export function useSignup(){

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(false)
    const{setAuthUser}=useAuthContext()

    







const signup=async(payload)=>{

    setLoading(true)

    try {
        const res=await fetch("/api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        let {user,error}=await res.json()
        if(!user || error) throw new Error(error)
        else
            {
                toast.success(`Welcome ${user.userName}`,{
                    duration: 6000,
                  })
            setUser(user);
            setAuthUser(user)
            localStorage.setItem("authInfo",JSON.stringify(user))
        }
        
    } catch (error) {
        toast.error(error.message,{
            duration: 3000,
          },
            {
        
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
              
            })
        console.log(error)
        return error.message
        
    }
    finally{
        setLoading(false)
    }
  

}


return{signup,user,loading}



}