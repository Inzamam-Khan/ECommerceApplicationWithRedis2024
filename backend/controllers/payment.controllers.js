const stripe = require("../DB/stripe");
const Coupon = require("../Models/couponModel");
const Order  = require("../Models/orderModel");



async function createCheckoutSession(req,res){

    try {
        
    const {cartItems}=req.body;
    let code=null
    
    if(!Array.isArray(cartItems)){
        return res.status(400).json({error:'Invalid Requests!'})

    }

    let totalAmount=0;

    const lineItems=cartItems?.map((product)=>{
        
        const amount=Math.round(product.price * 100);
        totalAmount+=amount * product.quantity
        
        return{
            price_data:{
                currency:'usd',
                product_data:{
                    name:product.name,
                    images:[product.image],
                },
                unit_amount:amount,
                
            },
            quantity:product?.quantity
        }
    })
    

    let coupon=null;
    
    if(code){
        coupon=await coupon.findOne({code:code,userId:req.user._id,isActive:true})
    if(coupon){
        totalAmount -=Math.round((coupon.discountPercentage * totalAmount ) / 100)

    }
    }

    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card",],
        line_items:lineItems,
        mode:"payment",
        success_url:`https://ecommerceapplicationwithredis2024.onrender.com/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${process.env.CLIENT_URL}/purchase-cancel`,
        discounts:coupon? [
            {
                coupon:await createStripeCoupon(coupon.discountPercentage)
            }
        ]:[],
        metadata:{
            userId:req.user._id.toString(),
            couponCode:code || "",
            products:JSON.stringify(
                cartItems.map((p)=>({
                    id:p._id,
                    quantity:p.quantity,
                    price:p.price
                }))
            )
        }
    })
    // console.log(session)
    if(totalAmount > 20000){
        await createNewCoupon(req.user._id);


    }
    return res.status(200).json({id:session.id,totalAmount:totalAmount/100})
        
    } catch (error) {
         
console.log(error)
return error.message

        
    }



}

async function checkoutSuccess(req,res){
    try {
        const {sessionId}=req.body;
        
        const session =await stripe.checkout.sessions.retrieve(sessionId);

        if(session.payment_status === "paid"){
            
            if(session.metadata.couponCode){
                await Coupon.findOneAndUpdate({
                    code:session.metadata.couponCode,userId:session.metadata.userId
                },{
                    isActive:false
                })

            }

        }


// create a new order;
const products=JSON.parse(session.metadata.products)
const newOrder=await Order.create({
    user:session.metadata.userId,
    products:products.map(p=>({
        product:p.id,
        quantity:p.quantity,
        price:p.price,
    })),
    totalAmount:session.amount_total / 100,
    stripeSessionId:sessionId

})
return res.status(200).json({
    success:true,
    message:"Payment successfull , order created!",
    orderId:newOrder._id
})


        
        
    } catch (error) {
                 
console.log(error)
return error.message
        
    }
}





















async function createStripeCoupon(discountPercentage) {
    const coupon=await stripe.coupons.create({
        percent_off:discountPercentage,
        duration:"once"
    })
    return coupon.id
    
}

async function createNewCoupon(userId) {
    const newCoupon=await Coupon.create({
        code:"GIFT" + Math.random().toString(36).substring(2,8).toUpperCase(),
        discountPercentage:10,
        expirationDate:new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId:userId

    })
    return newCoupon;
    
}












module.exports={
    createCheckoutSession,
    checkoutSuccess 
}