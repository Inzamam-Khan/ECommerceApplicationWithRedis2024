import { combineReducers } from "redux";



function ProductsReducer(state=JSON.parse(localStorage.getItem("productsInfo")),actions){
    const {payload,type}=actions;
    
    switch(type){
        case "SET_PRODUCTS":
        {
            return state=payload

        }
        default:{
            return state;
        }
    }

}

function CartReducer(state=[],actions){
    const {payload,type}=actions

    switch(type){
        case "SET_CART_ITEMS":{
            return state=payload
            
        }
        default:{
            return state;
        }

    }

}
function UserReducer(state=JSON.parse(localStorage.getItem("authInfo")) || null,actions){
    const {payload,type}=actions;
   
    switch(type){
        case "SET_USER":{
            return state=payload;

        }
        default :{
            return state;
        }
    }
}









export const allReducers=combineReducers({
    ProductsReducer,
    CartReducer,
    UserReducer

})