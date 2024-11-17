const { userAgent } = require("next/server");
const User = require("../Models/userModel");
const Product = require("../Models/productModel");





async function addToCart(req, res) {


    try {
        const { productId } = req.body;

        
        const userId = req.user._id;
        const user = await User.findById(userId)
        const addedToCart = user.cartItems.find((item) => 
            // console.log(item._id.toString()== productId)
            item._id.toString() == productId

        )
        console.log(`line 23 called ${addedToCart}`)
        if (addedToCart) {
            addedToCart.quantity+=1
            // user.cartItems.quantity += 1;
        }
        else {
            // await User.findByIdAndUpdate(userId, {
            //     $push: {
            //         cartItems: { productId }
            //     }
            // }, { new: true })
            user.cartItems.push(productId)
            

        }
        await user.save()
        return res.json({ message: "Cart Updated Successfully!" ,cartItems:user.cartItems})




    } catch (error) {
        console.log(error)
        return error.message

    }

}



async function getCartItems(req, res) {
    
    try {
        const userId=req.user._id
        const user=await User.findById(userId);
        

       const products=await Product.find({_id:{ $in:user.cartItems}})
       
       const cartItems=products.map(product=>{

       
        const item=user.cartItems.find(cartItem => cartItem.id === product.id)
        
        return {...product.toJSON(),quantity:item.quantity}
    })

       return res.json(cartItems)
        
    } catch (error) {
        console.log(error)
        return error.message
        
    }

}
async function removeAllFromCart(req, res) {
    try {
        const {productId}=req.body;
        const userId=req.user._id;
        const user=await User.findById(userId)
        if(!productId){
            user.cartItems=[];
        }
        else{
           
           
            user.cartItems=user.cartItems.filter((item)=>item._id.toString() != productId)
            
        }
        await user.save();
        return res.json({message:"Item Removed Successfully",user})

        
    } catch (error) {
        console.log(error)
        return error.message
        
    }


}
async function updateCart(req, res) {
    try {
        // const {productId}=req.params;
        const {quantity,productId}=req.body;
        console.log(`line 110 of update cart called ${productId}`)
        const userId=req.user._id;
        const user=await User.findById(userId);

        const existingItem=user.cartItems.find((item)=>item._id.toString() === productId)

        if(existingItem){
            if(quantity==0){
                user.cartItems=user.cartItems.filter((item)=>item._id.toString() != productId)
                await user.save();
                return res.json({message:"Cartitem quantity Updated!",user})
            }

            existingItem.quantity=quantity;
            await user.save()
            return res.json({message:"Cartitem quantity Updated!",user})
        }
        else{
            return res.status(404).json({error:"Product Not found!"})
        }
        
    } catch (error) {
        console.log(error)
        return error.message
        
    }
  
    


}











module.exports = {
    addToCart, getCartItems,
    removeAllFromCart,
    updateCart
}