const express = require("express")
const {    createOrder,
    getAllOrders,
    editOrder,
    setPaymentStatus,
    getSingleOrder,
    deleteOrder} = require("../controllers/order.controller")
const authenticateUser = require("../middlewares/authentiateUser")

const Router = express.Router();

Router.get('/all-orders',authenticateUser,getAllOrders)
Router.get('/single-order/:id',authenticateUser,getSingleOrder)
Router.post('/create-order',authenticateUser,createOrder);
Router.patch('/setPaymentStatus/:id',setPaymentStatus);
Router.patch('/update-order/:id',authenticateUser,editOrder);
Router.delete('/delete-order/:id',authenticateUser,deleteOrder)


module.exports = Router;