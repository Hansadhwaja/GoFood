
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Food = require("../models/foodModel");
const Catagory=require("../models/catagoryModel");

router.get("/foodData", async (req, res) => {

    try {
        const allData = await Food.find();
        const catData = await Catagory.find();

       res.send([allData,catData]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

   
});


module.exports = router;