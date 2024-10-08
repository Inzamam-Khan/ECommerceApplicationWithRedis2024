const jwt=require('jsonwebtoken')


const SECRET_KEY="111111"

const getToken=(userId)=>{
    const accessToken=jwt.sign({userId},SECRET_KEY,{
        expiresIn:"1d"
    })

    const refreshToken=jwt.sign({userId},SECRET_KEY,{
        expiresIn:"7d"
    })
    return {
        accessToken,refreshToken
    }

}
const validateToken=(token)=>{
    return jwt.verify(token,SECRET_KEY)

}



module.exports={
    getToken,validateToken
}