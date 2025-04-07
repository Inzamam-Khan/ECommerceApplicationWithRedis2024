const mongoose = require("mongoose")
const { createHmac, randomBytes } = require('crypto');
const { getToken } = require("../JsonTokens/jwt");
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [
            true, "Name is required"
        ]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        // select:false,
        required: [true, "Password is Required"],
        minlenth: [6, "Password must be atleast of length 6 "]
    },
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }

        }
    ],
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    salt:{
        type:String,
    }
}, { timestamps: true })


userSchema.pre("save", function(next) {
    if(!this.isModified("password")) return next()
    
    const user = this;
    
    const salt=randomBytes(16).toString();
    const hashedPassword =createHmac("sha256",salt).update(user.password).digest("hex");

    user.salt =salt;
    user.password =hashedPassword;

    next();

})


userSchema.static("matchPassword",async function(userName,password){
    
    try {
        const user = await this.findOne({userName});
               
        if (!user) throw new Error("User Not found!")

        const salt =user.salt;
        const dbHashedPassword =user.password;

        const userProvidedHash = createHmac("sha256",salt).update(password).digest("hex")
           
        if(dbHashedPassword != userProvidedHash)
            { 
                throw new Error("Invalid Credentials!")

            }
            else{
                const {accessToken,refreshToken}=getToken(user._id)

                // create and return token
                return {accessToken,refreshToken,user}          
            }
      

    } catch (error) {
        return {error:error.message}
S
    }
    




})

const User = mongoose.model("User", userSchema)



module.exports = User