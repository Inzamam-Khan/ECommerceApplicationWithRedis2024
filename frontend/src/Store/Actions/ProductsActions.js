export const setProductsAction=(payload)=>{
    return{
        type:"SET_PRODUCTS",
        payload
    }
}

export const setCartItems=(payload)=>{
    
    return{
        payload,
        type:'SET_CART_ITEMS'
    }
}