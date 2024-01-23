const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPercentage:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Products",productsSchema)