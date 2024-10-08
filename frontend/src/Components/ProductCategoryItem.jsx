import React from 'react'
import {motion} from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
const ProductCategoryItem = (props) => {
    const {category}=useParams()
    
    
    const {name,price,description,image,_id}=props
  return (




<motion.div
            

            initial={{ opacity: 0,y:30 }}
            whileInView={{ opacity: 1,y:0 }}
            viewport={{ once: true }}
            transition={{delay:.3,duration:.5}}
                                    
className=" w-full  sm:max-w-[12rem] sm:max-h-[18rem]  bg-gray-800  p-2
flex items-center flex-1 flex-col  border-gray-400 rounded-lg shadow text-gray-200 
">
    
    
        <img className="  mt-auto rounded-lg max-h-[13rem]  h-[10rem] w-1/2 sm:w-full border-red-500  object-fill" src={image} alt="" />
    
    <div className=" relative   mt-auto border-blue-500 p-2 w-full  ">
        
            <h5 className="mb-2 text-sm  max-h-[3rem] overflow-hidden font-medium tracking-wider capitalize text-emerald-400 ">
                {name}</h5>
        
        <p className="font-normal sm:text-3xl text-2xl
         flex  items-center   gap-3 ">
            <span className='sm:hidden text-5xl '>Price</span> ₹ 
           <span className='font-medium text-3xl sm:text-sm mt-auto  '> {price}</span>
         
           <Link to={`/category/${category}/${_id}`} className="flex items-center ml-4 sm:ml-auto
           px-2 py-1 text-xs font-medium  text-white
            bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            Details
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>
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







