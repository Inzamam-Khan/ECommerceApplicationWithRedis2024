export const useToggleFeaturedProducts=()=>{



    const ToggleFeaturedProducts=async(id)=>{
       const res= await fetch(`/api/products/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            }
        })
        
    }



    return {ToggleFeaturedProducts}
}