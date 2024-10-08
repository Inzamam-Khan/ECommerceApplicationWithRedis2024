import { useState } from "react"
import { useDispatch } from "react-redux"
import { setProductsAction } from "../Store/Actions/ProductsActions"

export const useGetProducts=()=>{

    const [products,setProducts]=useState(null)
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()

    const getProducts=async()=>{
        const res=await fetch("/api/products/",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data=await res.json()
        setProducts(data.products)
        // localstorage
        localStorage.setItem("productsInfo",JSON.stringify(data.products))
        // redux store
        dispatch(setProductsAction(data.products))
        

    }
    return {getProducts,loading,products}
}