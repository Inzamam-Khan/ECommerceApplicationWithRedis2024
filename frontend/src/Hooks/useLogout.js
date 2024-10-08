import { useState } from "react"
import { useAuthContext } from "../AuthContext/authContext"

export const useLogout=()=>{


const [loading,setLoading]=useState(false)
const{setAuthUser

}=useAuthContext()


    const Logout=async()=>{
        setLoading(true)
        try {
            const res=await fetch("/api/auth/logout",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
               
            })
            
            if(!error){
                localStorage.clear("authInfo")
                localStorage.clear("productsInfo")
                setAuthUser(null)

            }
        
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
        finally{
            setLoading(false)
        }
    }





    return {loading,Logout}
}