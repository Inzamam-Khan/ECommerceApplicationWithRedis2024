
const cookieParser=require('cookie-parser')
const dotenv=require("dotenv")
const express=require('express');
const authRoutes = require("./routes/authRoutes");
const connectToDb = require("./DB/connection");
const productRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const couponRoutes = require('./routes/couponRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const path = require('path');




const app=express();
const _dirname=path.resolve()



// middlewares
dotenv.config()
app.use(express.json({limit:"50mb"}))
app.use(cookieParser())
app.use(express.static(path.join(_dirname,"/frontend/dist")))




const PORT=process.env.PORT || 8080

// routes
app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/coupons',couponRoutes)
app.use('/api/payments',paymentRoutes)

app.get("*",(req,res)=>{
   res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})




 app.listen(PORT,()=>{
    
    console.log(`server started at ${PORT}`)
    connectToDb()
 })