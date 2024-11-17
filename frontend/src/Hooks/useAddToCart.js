import toast from "react-hot-toast"
import { useAuthContext } from "../AuthContext/authContext"

export const useAddToCart=()=>{

    const {setAuthUser,authUser}=useAuthContext()


    const handleAddToCart=async(productId)=>{
      if(!authUser) return toast.error("Login Required! ")
        try {
          const res=await fetch("/api/cart",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({productId})
          })
          const data=await res.json()
            
          const user=JSON.parse(localStorage.getItem("authInfo"))
          user.cartItems=data.cartItems
          setAuthUser(user)
          localStorage.setItem("authInfo",JSON.stringify(user))
    
    
          if(data.message){
            toast.success(data.message)
          }
        } catch (error) {
          toast.error(error.message)
          
        }
      
        
        
    
      }











    return {handleAddToCart}
}









