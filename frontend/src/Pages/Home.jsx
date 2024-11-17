import { CategoryItem } from "../Components/CategoryItem"
import { CATEGORIES } from "../Constants"
import {motion} from 'framer-motion'
import { useGetProducts } from "../Hooks/useGetProducts"
import { useEffect } from "react"
import { useSelector } from "react-redux"
export const Home=()=>{
    const {getProducts}=useGetProducts()
    
    const userReducer=useSelector(state=>state.UserReducer)
    
    
    
    
    
    
    
    
    
    
    useEffect(()=>{
        getProducts()

    },[])
    
    return(
        <div className="relative min-h-screen text-white overflow-hidden  border-blue-500">
           
            <div className="relative border-red-500 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ">
               
                <h1 className="text-center  text-5xl sm:text-6xl font-bold text-emerald-400 mb-4 md:pt-[0rem]
                pt-[4rem] "
                >Explore Our Categories</h1>
                <p className="text-center text-xl text-gray-300 mb-12">
                    Discover the latest trends in eco-friendly fashion
                </p>

                <motion.div
                     initial={{opacity:0,y:20}}
                     animate={{opacity:1,y:0}}
                     transition={{duration:0.8}}
                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 " 
                >
                    {CATEGORIES.map((item,index)=>(
                            <CategoryItem key={index} {...item}/>
))}
                    

                </motion.div>

            </div>
         
            
        </div>
    )
}