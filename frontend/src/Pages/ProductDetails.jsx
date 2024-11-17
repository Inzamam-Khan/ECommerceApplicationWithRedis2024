import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetProductsById } from '../Hooks/useGetProductById'
import { FaChevronCircleLeft, FaChevronLeft } from 'react-icons/fa'
import {toast} from 'react-hot-toast'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useAuthContext } from '../AuthContext/authContext'
import { useAddToCart } from '../Hooks/useAddToCart'

const ProductDetails = () => {
    const {productId}=useParams()
    const navigate=useNavigate()
    // const [productDetails,setProductDetails]=useState(null)
    
    const {getProductById,productDetail,setProductDetail}=useGetProductsById(productId)
    const cartReducer=useSelector(state=>state.CartReducer)
    const {handleAddToCart}=useAddToCart()
    
    useEffect(()=>{
        getProductById()
        return ()=>{setProductDetail(null);
            
        }
        
    },[productId])

   


  return (
    <div className=' border-blue-500 min-h-screen overflow-hidden  w-full text-white  '>

        <div  className="   border-green-500 w-full h-full mx-auto
         px-4 sm:px-6 lg:px-8 pt-[6rem] sm:pt-[6rem] ">
            
            <FaChevronLeft  className="hover:scale-150 cursor-pointer
             hover:border border-gray-400 rounded-full hover:fill-blue-400
              transition-all duration-300 delay-100 ease-in-out" size={24} onClick={()=>navigate(-1)}/>
       <h1 className='bg-gradient-to-r from-blue-400  to-red-500 text-transparent bg-clip-text text-center tracking-wider text-3xl font-medium capitalize leading-normal text-gray-300 '>
        
        Product Details
        </h1>

        <div className="flex flex-col sm:flex-row  flex-1 sm:mt-4 mt-8
          sm:justify-center  h-full sm:h-[18rem]  w-full  border-red-500  gap-4 ">
            
            {/* left div for image */}
            <div className="w-full sm:w-1/3    border-green-500 p-4 sm:p-0 h-[20rem] sm:max-h-[14.5rem] pt-2  rounded-xl ">
               
                <img src={productDetail?.image} className='h-full sm:w-1/2  w-full rounded-lg aspect-square object-fill   mx-auto ' />
            
            
            <div className="mt-4 w-full flex items-center justify-center gap-5">
                <button onClick={()=>{handleAddToCart(productId)}}
                 className='border w-30 rounded-md text-md px-2 py-1 text-yellow-400 hover:text-white border-yellow-400 ' >
                  Add to Cart</button>
                <button className='flex items-center border w-30 rounded-md text-md px-2 py-1 hover:text-white text-emerald-400 border-emerald-400 ' >Buy Now
               
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
                </button>
            </div>
            
            </div>


            {/* right div for details and contents */}
             <div className="w-full sm:w-1/2  border-gray-500  
             rounded-lg bg-gray-800  sm:max-h-[22rem]  mt-[4rem] sm:mt-0 p-4 sm:p-8 h-[20rem]">
            
             <h2 className=' capitalize text-xl font-bold tracking-wider text-emerald-400 '>{productDetail?.name}</h2>

             <p className=' my-2  capitalize'>Category : 
                <span className='text-blue-400'>{" "}{productDetail?.category}</span>
                 </p>

            <p className='border-b border-t text-blue-400 pb-1 border-gray-400 tracking-wider leading-normal overflow-auto
            w-full max-h-[8rem] sm:max-h-[6rem]  
             '>{productDetail?.description}
             </p>
             
             

            <p className="font-normal sm:text-3xl text-5xl  
         flex  items-center   gap-3 pt-6 text-emerald-400">Price
            <span className='text-xl tracking-wider mb-auto text-white '>  ₹ </span>
           
           <span className='font-medium  sm:text-7xl mt-auto text-gray-400 '> {productDetail?.price.toLocaleString()}</span>
           </p>
         

        </div>




        </div>
        </div>
    </div>
  )
}

export default ProductDetails
