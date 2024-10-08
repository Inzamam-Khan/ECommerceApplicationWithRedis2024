// import Redis from "ioredis"
const Redis=require('ioredis')
const redis = new Redis("rediss://default:AVllAAIjcDExMzU3ZTgxOWM3Mjk0NjFlODRkYmMyYjI4M2ZlYTRjMnAxMA@tops-gelding-22885.upstash.io:6379");

module.exports={redis}