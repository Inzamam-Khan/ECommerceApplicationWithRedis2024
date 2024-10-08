const express=require('express');
const { getAllProducts, featuredProducts,
     createProducts, deleteProduct, getRecommendedProducts, getProductsByCategory, toggleFeaturedProducts, 
     getProductsByProductId} = require('../controllers/product.controllers');
const {protectRoutes,adminRoute} = require('../Middlewares/auth.middleware');

const productRoutes=express.Router();




productRoutes.get("/",getAllProducts)
productRoutes.get("/featuredproducts",featuredProducts)
productRoutes.get("/category/:productId",getProductsByProductId)
productRoutes.get("/recommendations",getRecommendedProducts)
productRoutes.post("/",protectRoutes,adminRoute,createProducts)
productRoutes.patch("/:id",protectRoutes,adminRoute,toggleFeaturedProducts)
productRoutes.delete("/:id",protectRoutes,adminRoute,deleteProduct)


module.exports=productRoutes