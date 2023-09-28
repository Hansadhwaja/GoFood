const mongoose = require("mongoose");

const catagorySchema=new mongoose.Schema({
    CategoryName:{
        type:String,
        required:true
    }
});

const Catagory=mongoose.model("catagory_name",catagorySchema);

module.exports=Catagory;