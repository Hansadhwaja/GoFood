

const express=require("express");
const mongoose = require('mongoose');
const app=express();
require('dotenv').config();
app.use(express.json());
const userRoute=require("./routes/userRoutes");
const displayData=require("./routes/displayData");
const orderData=require("./routes/orderData");
const cors=require("cors");


app.use(cors());

mongoose.connect(process.env.URI,{useNewUrlParser:true}).
then(async ()=>{
        console.log("Connected to DB successfully");
        app.listen(process.env.PORT,(req,res)=>{
            console.log("Server running at port",process.env.PORT);
        });
       
}).catch((err)=>{
    console.log(err)
});

app.use(userRoute);
app.use(displayData);
app.use(orderData);


