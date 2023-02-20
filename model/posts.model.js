const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    no_if_comments : Number,
    userID: String
});

const PostsModel = mongoose.model("post",postsSchema);

module.exports={
    PostsModel
}