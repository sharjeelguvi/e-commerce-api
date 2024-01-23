const Product = require("../model/products.model")

const createProduct = (req,res)=>{
    try{
        const {name,price,discountPercentage,fileName} = req.body;
        if(!name || !price || !discountPercentage || !fileName){
            res.status(400).send("All fields are required")
        }else{
            Product.findOne({name:name})
            .then(singleProduct=>{
                if(singleProduct){
                    res.status(400).send("Product already exists")
                }else{
                    const product = new Product({
                        name,
                        image:fileName,
                        price,discountPercentage
                    })
                    product.save()
                    .then(response=>{
                        console.log(response)
                        res.status(201).send({msg:"success",result:response})
                    })
                    .catch(err=>{
                        console.log(err)
                        res.status(500).send("internel Server Error")
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                res.status(500).send("internel Server Error")
            })

        }
    }catch(err){
        res.status(500).send("internel Server Error")
    }
}

const getAllProducts = (req,res)=>{
    try{
        Product.find({})
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

const updateProduct = (req,res)=>{
    try{
        Product.updateOne({_id:req.params.id},{$set:req.body})
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

const deleteProduct = (req,res)=>{
    try{
        Product.deleteOne({_id:req.params.id})
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

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}