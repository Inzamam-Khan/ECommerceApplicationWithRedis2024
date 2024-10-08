import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
export function CategoryItem(payload) {
    const { href, name, imageUrl } = payload
    return (
        <div
       
         className="border border-gray-500 relative overflow-hidden h-80 
   w-full rounded-lg 
   " >
            <Link to={`/category${href}`}>
                <motion.div 
                 whileHover={{scale:.9}}
                 transition={{duration:.5}}

                    className="w-full h-full cursor-pointer ">

                    <div className=" absolute inset-0  z-10">
                        <img src={imageUrl} alt="" className='w-full max-h-[15rem] object-cover rounded-md' />

                        <div className="absolute -bottom-2 left-0 right-0 p-4 z-20">
                            <h3 className="text-white text-2xl font-bold mb-2 capitalize opacity-50">{name}</h3>
                            <p className="text-gray-200 text-sm">Explore {name}</p>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </div>
    )
}


