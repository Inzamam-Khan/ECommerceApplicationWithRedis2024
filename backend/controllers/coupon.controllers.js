const Coupon = require("../Models/couponModel")



async function getCoupon(req,res){
    try {
        const coupon =await Coupon.findOne({userId:req.user._id,isActive:true});
        res.json(coupon || null)
    } catch (error) {
        console.log(error)
        return error.message
        
    }


}


async function validateCoupon(req,res){
    try {
        const {code}=req.body;
        const coupon =await Coupon.findOne({code:code,userId:req.user._id,isActive:true})

        if(!coupon){
            return res.status(404).json({error:"Invalid Coupon"})

        }
        if(coupon.expirationDate > new Date()){
            coupon.isActive=false;
            await coupon.save();
            return res.status(404).json({error:"Coupon Expired!"})
        }


        return res.json({message:"Coupon Active",
            code:coupon.code,
            discountPercentage:coupon.discountPercentage
            
        })
        
    } catch (error) {
        
console.log(error)
return error.message
        
    }

       
}






module.exports={
    getCoupon,validateCoupon
}