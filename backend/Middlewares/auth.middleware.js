// middleware to verify user has token and is loggedin

const { validateToken } = require("../JsonTokens/jwt");
const User = require("../Models/userModel");

async function protectRoutes(req,res,next){
    
    try {
        const accessToken=req.cookies.accessToken;
        if(!accessToken) return res.status(401).json({error:"Unauthorized-No access Token found!"})

            const payload=validateToken(accessToken)
            const user=await User.findById(payload.userId).select("-password");
            if(!user) return res.status(401).json({error:"User not found!"})
        

            req.user=user
            next()
    } catch (error) {
        // console.log(error)
        if(error.name ==="TokenExpiredError"){
            return res.status(401).json({error:"Unauthorized-Access Token Expired!"})
        }
       
    }
    
    
    
    
}

function adminRoute(req,res,next){
    
    if(req.user && req.user.role=== 'admin')
        next();
    else{
        return res.status(403).json({error:"Access Denied- Admin only"})
    }

}


module.exports={
    protectRoutes,
    adminRoute
}