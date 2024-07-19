const mongoose = require('mongoose')
require('dotenv').config()

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('db connected')
    } catch (error) {
        console.log('db connection failed'+error)
        process_params.exit(1)
    }
}
module.exports = connectDb