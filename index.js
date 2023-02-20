const express = require("express");
const {userRouter} = require("./routes/User.routes");
const {postsRouter} =require("./routes/Posts.routes");
const{authenticate} = require("./middleware/authentication.middleware");
const {connection} = require("./config/db");

const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send("Home Page");
});

app.use("/users",userRouter);
app.use(authenticate);
app.use("/posts",postsRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to dataBase");
    } catch (error) {
        console.log(error);
    }
    console.log(`server running at port ${process.env.port}`);
})