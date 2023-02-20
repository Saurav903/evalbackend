const express = require("express");

const {PostsModel} = require("../model/posts.model");

const postsRouter = express.Router();

postsRouter.get("/",async(req,res)=>{
    const posts = await PostsModel.find();
    res.send(posts);
})

postsRouter.post("/create",async(req,res)=>{
    const payload = req.body;
    const posts = new PostsModel(payload);
    await posts.save();
    res.send("post has been created")
})

postsRouter.patch("/update/:id",async(req,res)=>{
    const userID = req.params.id;
    const payload = req.body;
    const posts = await PostsModel.findOne({"_id":userID});
    const user_postID = posts.userID;
    const user_req = req.body.userID
    try {
        if(user_postID!==user_req){
            res.send("you are not authorized");
        }else {
            await PostsModel.findByIdAndUpdate({_id:userID},payload);
            res.send("updated");
        }
    } catch (error) {
        console.log(error);
        res.send("something went wrong");
    }
})

postsRouter.delete("/delete/:id",async(req,res)=>{
    const userID = req.params.id;
    const posts = await PostsModel.findOne({"_id":userID});
    const user_postID = posts.userID;
    const user_req = req.body.userID
    try {
        if(user_postID!==user_req){
            res.send("you are not authorized");
        }else {
            await PostsModel.findByIdAndDelete({_id:userID});
            res.send("deleted");
        }
    } catch (error) {
        console.log(error);
        res.send("something went wrong");
    }
})

module.exports={
    postsRouter
}