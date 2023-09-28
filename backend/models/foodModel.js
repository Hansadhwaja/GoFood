const mongoose = require("mongoose");

const foodSchema=new mongoose.Schema({
    CategoryName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        required:true
    },
    description:{
        type:String
    }
});

const Food=mongoose.model("food_item",foodSchema);

module.exports=Food;