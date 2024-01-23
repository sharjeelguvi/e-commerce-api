const express = require("express")
const {createProduct,getAllProducts,updateProduct,deleteProduct} = require("../controllers/product.controller")
const path = require("path")
const multer = require("multer")
const Router = express.Router();
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/Images/Products')
    },
    filename:(req,file,cb)=>{
        let fileName = file.fieldname + '_' + Date.now() + path.extname(file.originalname)
        req.body.fileName = fileName;
        cb(null,fileName)
    }
})

const upload = multer({
    storage:storage
})
// app.post('/upload',upload.single('file'),(req,res)=>{
//     res.send(req.file)
// })
Router.get('/all-products',getAllProducts);
Router.post('/create-product',upload.single('file'),createProduct);
Router.put('/update-product/:id',updateProduct);
Router.delete('/delete-product/:id',deleteProduct)

module.exports = Router;