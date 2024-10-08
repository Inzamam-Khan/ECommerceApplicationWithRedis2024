const express=require('express')
const { addToCart, getCartItems, removeAllFromCart, updateCart } = require('../controllers/cart.controller')
const { protectRoutes } = require('../Middlewares/auth.middleware')
const cartRoutes=express.Router()


cartRoutes.get('/',protectRoutes,getCartItems) 

cartRoutes.post('/',protectRoutes,addToCart) //done

cartRoutes.delete('/',protectRoutes,removeAllFromCart) //done

cartRoutes.put('/:productId',protectRoutes,updateCart) //update cart Quantity done





module.exports=cartRoutes