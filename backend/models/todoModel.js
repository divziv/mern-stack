// const mongoose=require("mongoose");

// const todoSchema=new mongoose.Schema({
//     title:{type:String,required:true,unique:true},
//     createdAt:{type:Date,default:Date.now},
//     isCompleted:{type:Boolean,default:false},
//     isDeleted:{type:Boolean,default:false}
// });

// const toDo = mongoose.model("todo",todoSchema);

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("todo",todoSchema);