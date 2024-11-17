const mongoose=require('mongoose')

const  connectToDb=async()=> {
    try {
        const conn=await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`Database connected ${conn.connection.host}`)
    } catch (error) 
    {
     console.log('lie',error.message)   
    }
    
}

module.exports =connectToDb