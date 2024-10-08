import { useState } from "react";

export function useGetProductsById(productId){

    const [loading,setLoading]=useState(true);
    const [productDetail,setProductDetail]=useState(null)

    const getProductById=async()=>{
        
        const res=await fetch(`/api/products/category/${productId}`,{
            headers:{
                "content-Type":"application/json"
            }
        });
        const data=await res.json()
        setProductDetail(data)
        



    }




    return{getProductById,loading,productDetail,setProductDetail}
}