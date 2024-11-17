import { FaCartPlus } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";import React from 'react'
import {motion} from 'framer-motion'
import {  useNavigate, useParams } from 'react-router-dom'
import { useAddToCart } from '../Hooks/useAddToCart';

import { useAuthContext } from '../AuthContext/authContext';
const ProductCategoryItem = (props) => {
    const {category}=useParams()
    
    
    const {name,price,description,image,_id}=props
    const navigate=useNavigate()
    const {handleAddToCart}=useAddToCart()
    const {authUser}=useAuthContext()
    const isAddedtoCart=authUser?.cartItems.filter((item)=> item._id === _id)
    
    
  return (




<motion.div             

            initial={{ opacity: 0,y:30 }}
            whileInView={{ opacity: 1,y:0 }}
            viewport={{ once: true }}
            transition={{delay:.3,duration:.5}}
                                    
className=" w-full  sm:max-w-[12rem] sm:max-h-[18rem]  bg-gray-800  p-2
flex items-center flex-1 flex-col  border-gray-400 rounded-lg shadow text-gray-200 
">
    
    
        <img onClick={()=>navigate(`/category/${category}/${_id}`)} className="  mt-auto rounded-lg max-h-[13rem]  h-[10rem] w-1/2 sm:w-full border border-slate-500 cursor-pointer  object-fill" src={image} alt="" />
    
    <div className=" relative   mt-auto border-blue-500 p-2 w-full  ">
        
            <h5 className="mb-2 text-sm  max-h-[3rem] overflow-hidden font-medium tracking-wider capitalize text-emerald-400 ">
                {name}</h5>
        
        <p className="font-normal sm:text-3xl text-2xl
         flex  items-center   gap-3 ">
            <span className='sm:hidden text-5xl '>Price</span> ₹ 
           <span className='font-medium text-3xl sm:text-sm mt-auto  '> {price.toLocaleString()}</span>
         
           <button  className={`flex items-center ml-4 sm:ml-auto
           px-2 py-1 text-xs font-medium  text-white bg-blue-400
             rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 `}>
            {isAddedtoCart?.length>0? <BsCartCheckFill size={18} className=""/>
            :
            <FaCartPlus size={18} onClick={()=>{handleAddToCart(_id)}}/>  }
            
           
        </button>
           </p>
       
        {/*  */}
    </div>
</motion.div>






















//     <div classNameName=" border-red-500  overflow-hidden h-80  w-full sm:w-1/5 mx-2 my-1 rounded-lg" >
       
//            <motion.div 
//            initial={{scale:1}}
//             whileHover={{scale:1.1}}
//             transition={{duration:.5}}

//             classNameName="w-full h-full cursor-pointer ">

//                <div classNameName=" absolute inset-0   ">
//                    <img src={image} alt="" classNameName='w-full max-h-[15rem] object-cover rounded-md' />

//                    <div classNameName="absolute  bottom-0 left-0 right-0 p-4">
//                        <h3 classNameName="text-white text-2xl font-bold mb-2 capitalize opacity-50">{name}</h3>
//                        {/* <p classNameName="text-gray-200 text-sm">Explore {name}</p> */}
//                    </div>
//                </div>
//            </motion.div>
       
//    </div>
  )
}

export default ProductCategoryItem







