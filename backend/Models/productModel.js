const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product Name is required!"]
    },
    description:{
        type:String,
        required:[true,"Product Description is required!"]
    },
    price:{
        type:Number,
        min:0,
        required:[true,"Price is Required"]
    },
    image:{
        type:String,
        required:[true,"Product Image is required!"]
    },
    category:{
        type:String,
        required:[true,"Category  is required!"]
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    stock:{
        type:Number,
        required:[true,"Stock is required!"],
        default:1
    }

},{
    timestamps:true
})




const Product=mongoose.model("Product",productSchema)

module.exports=Product