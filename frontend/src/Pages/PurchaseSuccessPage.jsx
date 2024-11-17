import { FaArrowRight } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setCartItems } from "../Store/Actions/ProductsActions"
import {Link, useNavigate} from 'react-router-dom'
export function PurchaseSuccessPage(){

    const dispatch=useDispatch()
    let [data,setData]=useState({})
    


const handleCheckoutSuccess=async(sessionId)=>{
    
    try {
       const res= await fetch("/api/payments/checkout-success",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({sessionId})
        })
         setData(await res.json())
        // method to clear cart in local/global redux state
        // let authInfo=JSON.parse(localStorage.getItem("authInfo"))
        // authInfo.cartItems=[];
        // localStorage.setItem("authInfo",JSON.stringify(authInfo))
        dispatch(setCartItems([]))
      
        
    } catch (error) {
        console.log(error)
        
    }
}

useEffect(()=>{
    const sessionId=new URLSearchParams(window.location.search).get("session_id")
    
    if(sessionId){
        handleCheckoutSuccess(sessionId)
    }
    else{
        console.log("No session Id found!")
    }
    

},[])






    return(
        <div className="h-screen flex items-center justify-center px-4 ">
            
            <div className="max-w-md  w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
                
                <div className="p-6 sm:p-8">

                        <div className=" flex justify-center">
                            <CiCircleCheck size={40} className="fill-emerald-500"/>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-500 mb-2">Purchase Success
                            
                        </h1>

                        <p className="text-gray-300 text-center mb-2">
                            Thank you for your order.
                        </p>

                        <div className="bg-gray-700 rounded-lg p-4 mb-6">

                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-400">Order Number :</span>

                                <span className="text-sm font-semibold text-emerald-400"> {data?.orderId}</span>
                            </div>
                        </div>
                        <Link to="/" className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 rounded-lg
                        transition duration-300 flex  items-center justify-center">
                            <span className=" ml-auto">Continue Shopping</span>
                        <FaArrowRight className="ml-auto " size={20}/>

                        </Link>
                        
                </div>
            </div>
        </div>
    )
}

