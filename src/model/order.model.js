const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    products:[],
    total:{
        type:Number,
        required:true
    },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    transactionId:{type:String},

},{timestamps:true})

module.exports = mongoose.model("Order",orderSchema)