const express=require("express");
const { protectRoutes } = require("../Middlewares/auth.middleware");
const { createCheckoutSession, checkoutSuccess } = require("../controllers/payment.controllers");
const paymentRoutes=express.Router();

paymentRoutes.post('/create-checkout-session',protectRoutes,createCheckoutSession);
// paymentRoutes.post('/checkout-success',protectRoutes,checkoutSuccess);



module.exports=paymentRoutes;