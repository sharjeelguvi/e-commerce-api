const User = require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUser = async (req, res) => {
    try {
      const { email, password, mobileNo, name,address } = req.body;
      if (!email || !password || !mobileNo || !name || !address) {
        res.status(400).send("All fields are required");
      } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        const user = new User({
          email,
          password: hashedPassword,
          mobileNo,
          name,
          address
        });
  
        user.save()
          .then(() => {
            const token = jwt.sign({ email: user.email, userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
            res.status(201).json({ message: "User created successfully", token });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
          });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  const userSignIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).send("All fields are required");
      } else {
        const user = await User.findOne({ email });
  
        if (user) {
          const isPasswordMatch = await bcrypt.compare(password, user.password);
  
          if (isPasswordMatch) {
            const token = jwt.sign({ email: user.email, userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: "Logged In Successfully", token });
          } else {
            res.status(400).send("Password Mismatch");
          }
        } else {
          res.status(404).send("User not found");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

const updateUser = (req,res)=>{
    try{
        User.updateOne({_id:req.params.id},{$set:{...req.body}})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send("Internal Server Error")
        })
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
}

const deleteUser = (req,res)=>{
    try{
        User.deleteOne({_id:req.params.id})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send("Internal Server Error")

        })
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
}

const getAllUsers = (req,res)=>{
    try{
        User.find({})
        .then(response=>{
            res.status(200).send({msg:"success",result:response})
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

const getSingleUser = (req,res)=>{
    try{
        User.findOne({_id:req.params.id})
        .then(response=>{
            console.log(response)
            if(!response){
                res.status(404).send("User not found")
            }else{
                res.status(200).send({msg:"success",result:response})
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send("Internal Server Error")
        })
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
}


module.exports = {
    createUser,
    userSignIn,
    getAllUsers,
    updateUser,
    deleteUser,
    getSingleUser
}