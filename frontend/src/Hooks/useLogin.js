import { useState } from "react"
import { useAuthContext } from "../AuthContext/authContext"
import {toast} from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { setUser } from "../Store/Actions/UserActions"
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
export function useLogin(){

    // const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(false)
    const{setAuthUser}=useAuthContext()
    const dispatch=useDispatch()
    







const Login=async(payload)=>{

    setLoading(true)

    try {
        const res=await fetch("/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        let {user,error}=await res.json()
        if(!user || error) throw new Error(error);
        
        else
        {   toast.success(`Welcome ${user.userName}`,{
            duration: 6000,
          })
            // setUser(user);
            setAuthUser(user)
            dispatch(setUser(user))
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
              
            },
          )
      
        return error.message
        
    }
    finally{
        setLoading(false)
    }
  

}


return{Login,loading}



}