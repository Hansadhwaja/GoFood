
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/orderModel");


router.post("/orderData", async (req, res) => {
    let data=req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    let eId=await Order.findOne({'email':req.body.email})
    console.log(eId);
    if(eId===null){
        try {
         const order=await Order.create({
            email:req.body.email,
            order_data:[data]
         });
            res.status(200).json(order);
            console.log("Successfully Created the User Order");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
    else{
        try {
         const updatedOrder=await Order.findOneAndUpdate({'email':req.body.email},
            {$push:{order_data:data}});
            res.status(200).json(updatedOrder);
            console.log("Success Updated the User Order");
         
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
});
router.post("/myOrderData", async (req, res) => {
    try {
        const myData=await Order.findOne({'email':req.body.email});
        res.status(200).json(myData.order_data);
    } catch (error) {
        res.status(500).json("Server Error",error.message);
    }
});


module.exports = router;