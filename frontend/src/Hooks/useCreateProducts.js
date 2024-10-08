import { useState } from "react"
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export const useCreateProducts=()=>{
    const [loading,setLoading]=useState(false);
    const [product,setProduct]=useState(null)
    const navigate=useNavigate()



    const CreateProducts=async(payload)=>{
        console.log(payload)
       try {
        const res=await fetch("/api/products/",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        const data=await res.json()
        
        if(data.error) throw new Error(data.error)

        toast.success(await res.json().message)
        
       } catch (error) {
        console.log(error.message)
        toast.error(error.message)
        
       }

    }
    return{CreateProducts,loading,product}
}