import React from 'react'
import { MdDelete } from "react-icons/md";
import { useState ,useEffect} from 'react'
import toast from 'react-hot-toast';
import { TiTick } from "react-icons/ti";
import { useAuthContext } from '../AuthContext/authContext';



function CartItem(props) {

  

  const {setAuthUser}=useAuthContext()
  const {category,description,image,name,price,quantity,_id}=props
  const [items,setItems]=useState(quantity)
  const [disableSubmit,setDisableSubmit]=useState(true)
  
  const handleDeleteItems=async(productId)=>{
    try {
      const confirmDelete= window.confirm("Are You Sure?")
      if(confirmDelete)
      {
        const res=await fetch("/api/cart",{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({productId})
        })
        const data=await res.json()
        
        const user=JSON.parse(localStorage.getItem("authInfo"))
        user.cartItems=data?.user.cartItems
        setAuthUser(user)
        localStorage.setItem("authInfo",JSON.stringify(user))
        if(data.message){
          toast.success(data.message)
        }
        
      }
      else {
        return ;
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  
  }


  const handleUpdateCart=async(quantity,productId)=>{
    try {
      const res=await fetch("/api/cart",{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({quantity,productId})
      })
      const data=await res.json()
      
      const user=JSON.parse(localStorage.getItem("authInfo"))
        user.cartItems=data?.user.cartItems
        setAuthUser(user)
        localStorage.setItem("authInfo",JSON.stringify(user))
      if(data.message){
        setDisableSubmit(true)
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }


  
  return (
    <div className=' h-[12rem] mb-2  border-gray-400 '>
        <div className='bg-[#2e333c] h-full flex flex-1 items-center justify-start p-2 rounded-xl  border-gray-400'>
           
            <div className=" border-red-500 w-[12rem]  h-full rounded-xl">
                <img src={image} alt="" className='aspect-square rounded-xl w-full h-full' />
            </div>


        <div className="overflow-auto w-[70%] h-full ml-auto flex flex-col items-start p-2 lg:p-0">
        <p className='font-semibold capitalize text-lg text-emerald-500'>{category}</p>
          <h2 className='text-blue-400 font-semibold'>{name.substring(0,50)}...</h2>
          <p>{description.substring(0,100)}...</p>
          <p className=' mt-auto'>
            <span className='text-emerald-400 text-3xl mr-1'>₹
            </span>

            {price.toLocaleString()}  per item
          </p>

<div className='font-bold w-[10rem] text-white flex flex-1 items-center justify-between'>
   <span className='font-medium tracking-wider'>Quantity- </span>
  <input type="number" className='text-emerald-400 w-full bg-inherit px-2' defaultValue={quantity} min="1" max={5} 
  onChange={(e)=>{
    setItems(e.target.value)
    setDisableSubmit(false)
  }}/>

  <button disabled={disableSubmit} onClick={()=>handleUpdateCart(items,_id)}lick ><TiTick className='' size={25} fill={`${disableSubmit?`none`:`blue`}`} />
  </button>

  <MdDelete  onClick={()=>{
    handleDeleteItems(_id)
  }} className='w-20 cursor-pointer' fill='red'/></div>
        </div>

        </div>
      
    </div>
  )
}

export default CartItem
