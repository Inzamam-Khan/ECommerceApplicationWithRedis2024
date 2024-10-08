
const cookieParser=require('cookie-parser')
const dotenv=require("dotenv")
const express=require('express');
const authRoutes = require("./routes/authRoutes");
const connectToDb = require("./DB/connection");
const productRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const couponRoutes = require('./routes/couponRoutes');
const paymentRoutes = require('./routes/paymentRoutes');




const app=express();




// middlewares
dotenv.config()
app.use(express.json({limit:"50mb"}))
app.use(cookieParser())





const PORT=process.env.PORT || 8080

// routes
app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/coupons',couponRoutes)
app.use('/api/payments',paymentRoutes)




 app.listen(PORT,()=>{
    
    console.log(`server started at ${PORT}`)
    connectToDb()
 })