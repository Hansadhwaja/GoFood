const mongoose = require("mongoose");

const orderSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_item:{
        type:Array,
        required:true
    }
},{versionKey:false});

const Order=mongoose.model("order",orderSchema);

module.exports=Order;