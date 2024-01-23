const express = require('express')
const mongoose = require('mongoose')
const multer = require("multer")
const path = require('path')
const cors = require('cors')
require("dotenv").config();
const app = express();
const PORT = 3002 || process.env.PORT

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

const userRouter = require("./src/routes/user.router");
const productRouter = require("./src/routes/product.router")
const orderRouter = require("./src/routes/order.router")


app.use("/user",userRouter);
app.use("/product",productRouter)
app.use("/order",orderRouter)

mongoose.connect(process.env.DB)
.then(res=>{
    console.log("connected to db")
})
.catch(err=>{
    console.log(err)
})


app.get('/',(req,res)=>{
    res.send("server is up and running")
})



app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`)
})
