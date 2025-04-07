// import Redis from "ioredis"
const Redis=require('ioredis')
const redis = new Redis("rediss://default:AfXlAAIjcDE4MDgzY2YxYWNmOTI0NmQ4OGYxMTE5NGJjYjZkNWQwOXAxMA@singular-rat-62949.upstash.io:6379");
redis.on("error",(err)=>{
    console.log("redis connection error:",err.message)
})
redis.on('connect', () => {
    console.log('Connected to Redis server');
  });
module.exports={redis}




