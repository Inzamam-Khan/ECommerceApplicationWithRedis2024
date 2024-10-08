const express=require('express');
const { protectRoutes } = require('../Middlewares/auth.middleware');
const { getCoupon, validateCoupon } = require('../controllers/coupon.controllers');
const couponRoutes=express.Router()


couponRoutes.get('/',protectRoutes,getCoupon)
couponRoutes.get('/validatecoupon',protectRoutes,validateCoupon)

module.exports=couponRoutes