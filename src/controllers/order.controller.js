const mongoose = require("mongoose");
const Order = require("../model/order.model")
const { uid }= require('uid');
const createOrder = (req,res)=>{
    const {userId} = req.user;
    console.log(req.user)
    try{
        const {products} = req.body;
        if(!products){
            res.status(400).send("All fields are required")
        }else{
            const order = new Order({
                orderId:`OrderId_${uid()}`,
                products,
                userId:new mongoose.Types.ObjectId(userId),
                total:products.reduce((acc,el)=>acc+el.price,0)
            })
            order.save()
            .then(response=>{
                console.log(response)
                res.status(201).send("Order created successfully")

            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

const setPaymentStatus = (req,res)=>{
    if(!req.body.transactionId){
        res.status(400).send("All fields are required")
    }else{
        try{
            Order.updateOne({_id:req.params.id},{$set:{transactionId:req.body.transactionId}})
            .then(response=>{
                res.status(200).send({msg:"success",result:response})
            })
            .catch(err=>{
                console.log(err)
                res.status(500).send("Internal Server Error")
            })
        }
        catch(err){
            res.status(500).send("Internal Server Error")
        }
    }

}

const getSingleOrder = (req,res)=>{
    try{
        Order.findOne({_id:req.params.id})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send("Internal Server Error")
        })
    }
    catch(err){
        res.status(500).send("Internal Server Error")
    }
}

const getAllOrders = (req,res)=>{
    try{
        Order.find({})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send("Internal Server Error")
        })
    }
    catch(err){
        res.status(500).send("Internal Server Error")
    }
}

const editOrder = (req,res)=>{
    try{
        Order.updateOne({_id:req.params.id},{$set:req.body})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    catch(err){
        res.status(500).send("Internal Server Error")
    }
}

const deleteOrder = (req,res)=>{
    try{
        Order.deleteOne({_id:req.params.id})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    catch(err){
        res.status(500).send("Internal Server Error")
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    editOrder,
    setPaymentStatus,
    deleteOrder,
    getSingleOrder
}