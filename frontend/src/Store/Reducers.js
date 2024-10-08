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










export const allReducers=combineReducers({
    ProductsReducer

})