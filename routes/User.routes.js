const express = require("express");
const {UserModel} = require("../model/user.model");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city} = req.body;
    try {
        const users = await UserModel.find({email});
        if(users){
            console.log("user already exists");
            res.send("user already exists")
        }else {
            bcrypt.hash(password,2,async(err,hash)=>{
                if(err){
                    res.send(err.message);
                } else {
                    const user = new UserModel({name,email,gender,password:hash,age,city});
                    await user.save();
                    res.send({"msg":"New user has been register"});
                }
            })
        }
        
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong","error":error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Logged in","token":token});
                }
                else {
                    res.send(err);
                }
            });
        }else {
            res.send({"msg":"wrong credentials"});
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong","error":error.message});
    }
})

module.exports={
    userRouter
}