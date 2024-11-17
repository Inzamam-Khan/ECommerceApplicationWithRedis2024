import React, { useEffect } from 'react'
import { useGetProducts } from '../Hooks/useGetProducts'

import { FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useToggleFeaturedProducts } from '../Hooks/useToggleFeaturedProducts';

function Products() {
    const { getProducts,products}=useGetProducts()
    const {ToggleFeaturedProducts}=useToggleFeaturedProducts()
    

    useEffect(()=>{
        getProducts()

    },[products])
  return (
    <div className=' w-full  px-2 border-blue-500 h-[70vH]'
    >
        <div className="px-2 border rounded-md border-gray-500 bg-gray-400 bg-opacity-20
         mx-auto w-full  h-full py-2  ">
           
             <h1 className='text-2xl capitalize font-semibold text-emerald-400 
             text-center '>View Products</h1>

             
<div className=" mt-1  w-full border-blue-500  max-h-[63vH] overflow-auto">

    <table className=" text-sm text-left  text-white dark:text-gray-400 w-full ">
        <thead className="text-xs  border-b border-slate-400 uppercase dark:bg-gray-700  w-full">
            <tr>
                <th scope="col" className="px-6 py-3  ">
                    Product 
                </th>
                <th scope="col" className="px-6 py-3">
                    Price 
                </th>

                <th scope="col" className="px-6 py-3">
                    Stock
                </th>

                <th scope="col" className=" px-6 py-3">
                    Category
                </th>

                <th scope="col" className=" px-6 py-3">
                    Featured
                </th>
                <th className='max-w-[2rem] text-center'>Actions</th>
               
            </tr>
        </thead>
        <tbody className='' >

            {
                products?.map((product)=>(
            

            <tr className=" border-b cursor-pointer hover:bg-blue-500 hover:bg-opacity-20  text-white border-slate-400 ">
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap  max-w-[7rem] text-wrap h-[2rem]">
                    {product.name}
                </td>
                <td className="px-6 py-4">
                ₹ {product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                    {product.stock}
                </td>
                <td className="px-6 py-4 capitalize">
                    {product.category}
                </td>

                <td className="px-6 py-4 capitalize ">
                    {
                    // !product?.isFeatured?  <FaStar className='fill-blue-500 cursor-pointer' /> : 
                    <FaStar className={`${product.isFeatured ? `fill-blue-500` : `` } cursor-pointer`}
                    onClick={()=>ToggleFeaturedProducts(product._id)}  />
                    
                    }


                </td>
                <td className=' flex items-center justify-evenly py-10
                 lg:py-7 '>
                <FaRegEdit className='fill-blue-400 cursor-pointer '/>
                <FaDeleteLeft className='fill-red-500 cursor-pointer'/>
                </td>
            </tr>


                ))}
            

           
        </tbody>
    </table>
</div>
             
           

         </div>
     
    </div>
  )
}

export default Products












// <div classNameName="  capitalize grid grid-cols-5 gap-4    "> 


// <div >namedfasf</div>
// <div>price</div>
// <div>stock</div>
// <div>category</div>
// <div classNameName=' text-end'>
//     actions

// </div>


// 
//     <div classNameName="">{product.name}</div>
    
//     <div>{product.price}</div>
//     <div>{product.stock}</div>
//     <div classNameName=' '>{product.category}</div>
//     <div classNameName='flex items-center gap-1 justify-end '>
//  
// </div>
    
//     </>
    

// ))}

// </div>

