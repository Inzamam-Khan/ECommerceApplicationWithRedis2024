const express=require('express')

const { Login, Signup, Logout, RefreshToken, getProfile } = require('../controllers/auth.controllers');
const { protectRoutes } = require('../Middlewares/auth.middleware');
const authRoutes=express.Router()

authRoutes.post('/login',Login)
authRoutes.post('/signup',Signup);
authRoutes.post('/logout',Logout);
authRoutes.post('/refreshToken',RefreshToken);
authRoutes.get('/profile',protectRoutes,getProfile)


module.exports=authRoutes