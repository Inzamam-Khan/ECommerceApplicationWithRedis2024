
import {loadStripe} from '@stripe/stripe-js'

import React from 'react'
import CartItem from '../Components/CartItem'
import { useState } from 'react'
import { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import { MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems } from '../Store/Actions/ProductsActions'
import { useAuthContext } from '../AuthContext/authContext'



const stripePromise=loadStripe("pk_test_51Q4m3zLBf4EzHuMjNB1gFq8zLJQSjOMbZ0E3Ocj9VQHT7RszheR9FOfyAwQw67UbJB23iZIwZ5LzkDZVOEwEJwP7002w1oXLfC")



function CartPage() {
    let total=0
    let deliveryCharges=0
    console.log(deliveryCharges)
        const navigate=useNavigate()
        // const [cartItems,setCartItems]=useState(null)
        const cartItems=useSelector(state=>state.CartReducer)
        const dispatch=useDispatch()
        const {authUser}=useAuthContext()
        
   
   
        const getCartItems=async()=>{
        const res=await fetch("/api/cart")
        const data=await res.json()
            dispatch(setCartItems(data))
        


    }

    const handlePayment=async(cartItems)=>{
     let  products={
        cartItems
      }
      
      const stripe=await stripePromise;
      const res=await fetch("/api/payments/create-checkout-session",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(products)
      })
      const {id}=await res.json()
      const result=await stripe.redirectToCheckout({
        sessionId:id
      })
      if(result.error){
        console.log(result.error)
      }
    
    }


    useEffect(()=>{
getCartItems()


    },[authUser])


  return (
    <div className=' relative mt-[8rem] sm:mt-[5rem] '>

        <h2 className='text-2xl text-center font-medium tracking-wider'>
            Cart Page</h2>


            {!cartItems?.length>0 && 
            <div className='flex  flex-col items-center gap-4 mt-[8rem] justify-center'>
            <MdOutlineShoppingCart  className='fill-emerald-500' size={80}/>
            <h2 className="text-center  font-semibold text-5xl capitalize text-emerald-500"> your cart is empty</h2>
            <button onClick={()=>navigate("/")} className="transition-all duration-300 ease-in-out border-slate-300 rounded px-2 py-1 bg-blue-500 text-black font-bold tracking-wider hover:ring-4 hover:text-slate-200 hover:ring-blue-500">Go Home</button>

            </div>
}


    





        <div className="relative w-full min-h-[82vH] flex flex-1 flex-col items-start lg:flex-row  gap-4
         p-2  border-red-500 ">



            {/* left div */}
            <div className="lg:w-[60%] lg:max-w-[60%] w-full  max-h-[80vH]  p-2 overflow-auto">
                {/* cart item */}
            {
                cartItems?.map((item,index)=>(
                    <CartItem key={index} {...item}/>
                ))
            }
            
                

                
            </div>



            {/* right div */}
            {cartItems?.length >0 && 
            
            <div className="p-2  bg-[#2e333c] rounded-xl lg:fixed lg:right-0 
             lg:mr-4 h-[32rem] lg:h-[80vH] lg:max-w-[38%] lg:w-[38%] w-full ">
            <h2 className='text-2xl text-center font-medium tracking-wider'>Order Details</h2>
           
            <div className="flex flex-col  overflow-auto ">
                    {cartItems?.map((item,index)=>(
                        <div key={index} className="pl-1  ">
                            <ul className="flex flex-row items-center justify-start list-disc ">
                            <li className='ml-3.5'>{item?.name}</li>
                            <p className='ml-auto mr-2'>{item?.quantity}</p>
                             
                
                            </ul>

</div>

                    ))}
                    
                        <div className=''>
              <div className="flex items-center justify-between gap-4">
                {cartItems.map((item)=>{
                  deliveryCharges+=item.price *5 /100
                })}
                <div className="text-base font-normal  ">Delivery</div>
                <div className="text-base font-medium ">{"₹ "}
                  {parseInt(deliveryCharges).toLocaleString()}
                  {/* {"₹ 79"} */}
                </div>
              </div>

          

            <div className="flex items-center justify-between gap-4 border-t border-gray-400 pt-2 mt-1">
              <div className="text-base font-bold ">Total</div>
              {
                cartItems.map((item)=>{
                    
                    total+=(item.price) * item.quantity
                    
                    
                    
                }
                
              )
              
                
               
              }
              
               <div className="text-base font-bold ">{parseInt(total+deliveryCharges).toLocaleString()}</div>
             
            </div>
          

          <button onClick={()=>handlePayment(cartItems)} className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800
           focus:outline-none focus:ring-4 focus:ring-primary-300  mt-[2rem] bg-blue-700 hover:text-black ">Proceed to Checkout</button>

          <div className="flex items-center justify-center gap-2 mt-[1rem]">
            <span className="text-sm font-normal text-gray-500  dark:text-gray-400"> or </span>
            <Link to="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:underline  dark:text-primary-500">
              Continue Shopping
              <svg className="h-5 w-5" aria-hidiven="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </Link>
          </div>
        

        <div className="space-y-4 border-t border-slate-400 mt-[2rem]  p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
         
          <form className="space-y-4">
            <div>
              <label for="voucher" className="mb-2 block text-sm font-medium  dark:text-white"> Do you have a voucher or gift card? </label>
              <input type="text" id="voucher" className="block w-full rounded-lg   bg-slate-700 p-2.5 text-sm text-emerald-500 font-bold tracking-wider placeholder-emerald-500 " placeholder="Enter Code Here ..." required />
            </div>
            <button type="submit" className="flex text-black hover:text-white w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:outline-none bg-emerald-500 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 
            dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Apply Code</button>
          </form>
        </div>
      </div>
    
  



</div>
                    
                

            
            </div>

            }
            

        </div>
      
    </div>
  )
}

export default CartPage
