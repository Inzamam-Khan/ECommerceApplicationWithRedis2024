const User = require("../Models/userModel");
const {getToken, validateToken}=require('../JsonTokens/jwt.js')
const {redis} =require('../DB/redis.js')

const storeRefreshToken=async(userId,refreshToken)=>{
    await redis.set(`refresh_token:${userId}`,refreshToken,"EX",7*24*60*60)

}

const setCookies=(res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,
        {
            httpOnly:true,
            sameSite:"strict",
            maxAge:24 * 60* 60 * 1000  //1day takes value into milliseconds;

        }
    )

    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:7 * 24 * 60 * 60 * 1000
    })

}

async function RefreshToken(req,res) {
    try {
        const refreshToken=req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json({error:"No refresh Token found!"})

        const payload=validateToken(refreshToken)
        const storedToken=await redis.get(`refresh_token:${payload.userId}`)

        if(storedToken != refreshToken) return res.status(401).json({error:'Invalid refresh Token'})

            const {accessToken}=getToken(payload.userId);
            res.cookie('accessToken',accessToken,{
                httpOnly:true,
                sameSite:'strict',
                maxAge:24 * 60 * 60 * 1000
            })
            return res.json({message:"Access Token created Successfully"})
        
    } catch (error) {
        return error.message
        
    }
    
}

async function Login(req,res){
    try {
    const {userName,password}=req.body;
    const {accessToken,refreshToken,user,error}=await User.matchPassword(userName,password)

    
    if(!user) throw new Error(error)
else{
            await storeRefreshToken(user._id,refreshToken)
            setCookies(res,accessToken,refreshToken)
            return res.status(200).json({user,message:"Login Successfully"})
}

  
    } catch (error) {
        console.log(error)
        return res.status(404).json({error:error.message})
        
    }
    

    
}

async function Signup(req,res){

    const {userName,email,password}=req.body;
    
    try {
        var user=await User.findOne({email});    
        if(user) return res.status(400).json({error:"User Already Exists!"})
    
         user=await User.create({
            userName,email,password
    
        })
        const {accessToken,refreshToken}=getToken(user._id)

        await storeRefreshToken(user._id,refreshToken)

        setCookies(res,accessToken,refreshToken)

        
        return res.status(201).json({user,message:"User Created Successfully"})
        
    } catch (error) {
        return res.status(500).json({error:error.message})
        

        
    }
  


}


async function Logout(req,res) {
    try {
        const refreshToken=req.cookies.refreshToken;
        if(refreshToken){
            const payload=validateToken(refreshToken)
            console.log(payload.userId)
            await redis.del(`refresh_token:${payload.userId}`)
            

        }
        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')

        res.json({message:"logout Successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
    
}

async function getProfile(req,res){
    return res.json(req.user)
}



module.exports={
    Login,
    Signup,
    Logout,
    RefreshToken,getProfile
}
