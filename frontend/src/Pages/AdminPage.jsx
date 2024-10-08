import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateProducts from '../Components/CreateProducts'
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";

import Products from '../Components/Products';

function AdminPage() {
    const [showCreateProducts,setShowCreateProducts]=useState(true)
    const [showProducts,setShowProducts]=useState(false)
    const [showAnalysis,setShowAnalysis]=useState(false)

  return (
    <div className=' w-full  md:top-20 relative top-[8rem]
          border-red-800'>
        
        <div className="container flex flex-col gap-4  mx-auto  ">
        
            <h1 className=' text-center text-2xl font-bold text-blue-400'>Admin Dashboard</h1>
           
            <div className="flex flex-1   items-center justify-center gap-8 ">
                <button className={`flex items-center gap-1 ${showCreateProducts? `bg-emerald-500 border border-gray-400 text-white`:``} border rounded-md px-3 py-1  border-slate-400
                transition-all duration-300 ease-in-out`}
                onClick={()=>{

                    setShowCreateProducts(true)
                    setShowProducts(false)
                    setShowAnalysis(false)

                }}
                >
                    <CiCirclePlus size={20}  className='font-bold'/>
                    Create Product</button>
                <button 
                className={`flex items-center gap-1 ${showProducts? `bg-emerald-500 border border-gray-400 text-white`:``} border rounded-md px-3 py-1  border-slate-400
                 transition-all duration-300 ease-in-out`}
                onClick={()=>{

                    setShowCreateProducts(false)
                    setShowProducts(true)
                    setShowAnalysis(false)

                }}><AiOutlineProduct size={18}  className='font-bold'/>
                    Products</button>
                <button className={`flex items-center gap-1 ${showAnalysis? `bg-emerald-500 border border-gray-400 text-white`:``} border rounded-md px-3 py-1  border-slate-400
                 transition-all duration-300 ease-in-out`}
                onClick={()=>{

                    setShowCreateProducts(false)
                    setShowProducts(false)
                    setShowAnalysis(true)

                }}
                ><SiSimpleanalytics size={12}  className='font-bold'/>
                    Analysis</button>
            </div>


            <div>
                {showCreateProducts && <CreateProducts/>}
                {showProducts && <Products/>}
            </div>
        </div>
      
    </div>
  )
}

export default AdminPage
