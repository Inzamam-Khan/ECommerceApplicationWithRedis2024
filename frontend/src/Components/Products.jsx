import React, { useEffect } from 'react'
import { useGetProducts } from '../Hooks/useGetProducts'

import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

function Products() {
    const { getProducts,products}=useGetProducts()

    useEffect(()=>{
        getProducts()

    },[])
  return (
    <div className=' w-full  px-2 border-blue-500 h-[70vH]'
    >
        <div className="px-2 border rounded-md border-gray-500 bg-gray-400 bg-opacity-20
         mx-auto w-full md:w-1/3 h-full py-2 ">
           
             <h1 className='text-2xl capitalize font-semibold text-emerald-400 
             text-center '>View Products</h1>
             
             <div className="  capitalize grid grid-cols-5 gap-4  mt-1 border-gray-400 w-full overflow-auto max-h-[63vH] "> 


                <div >name</div>
                <div>price</div>
                <div>stock</div>
                <div>category</div>
                <div className=' text-end'>
                    actions

                </div>
                

                {products?.map((product)=>(<>
                    <div className="">{product.name}</div>
                    
                    <div>{product.price}</div>
                    <div>{product.stock}</div>
                    <div className=' '>{product.category}</div>
                    <div className='flex items-center gap-1 justify-end '>
                    <FaRegEdit className='hover:fill-blue-400 cursor-pointer'/>
                    <FaDeleteLeft className='hover:fill-red-500 cursor-pointer'/></div>
                    
                    </>
                    

                ))}
                
             </div>


         </div>
     
    </div>
  )
}

export default Products
