const express = require("express")
const {createUser,
    userSignIn,
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers} = require("../controllers/user.controller")
const authenticateUser = require("../middlewares/authentiateUser")

const Router = express.Router();

Router.get('/all-users',authenticateUser,getAllUsers)
Router.get('/single-user/:id',authenticateUser,getSingleUser)
Router.post('/create-user',createUser);
Router.post('/signin',userSignIn);
Router.patch('/update-user/:id',authenticateUser,updateUser);
Router.delete('/delete-user/:id',authenticateUser,deleteUser)


module.exports = Router;