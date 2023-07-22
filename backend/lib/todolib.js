// // const { updateOne } = require("/backend/models/todoModel");
// // const toDo = require("/backend/models/todoModel");


// // module.exports.getAllToDos = async function(callback)
// // {
// //     try{
// //         var todos = await toDo.find({isDeleted:false});
// //         callback(null,todos);
// //     }
// //     catch(err){
// //         callback(err,null);
// //     }
// // }

// // module.exports.getToDosByQuery = async function(query,callback)
// // {
// //     try{
// //         var result=await toDo.find(query);
// //         callback(null,result);
// //     }
// //     catch(err){
// //         callback(err,null);
// //     }
// // }

// // module.exports.getSingleToDoById = async function(id,callback)
// // {
// //     try{
// //         var result=await toDo.findById(id);
// //         callback(null,result);
// //     }
// //     catch(err){
// //         callback(err,null);
// //     }
// // }

// // module.exports.createToDo = async function(data,callback)
// // {
// //     try{
// //         var todo = new toDo({
// //             title:data.title,
// //             createdAt:data.createdAt,
// //             isCompleted:data.isCompleted,
// //             isDeleted:data.isDeleted
// //         });
// //         var result=await toDo.save();
// //         callback(null,result);
// //     }
// //     catch(err){
// //         callback(err,null);
// //     }
// // }

// // module.exports.updateToDoById = async function(id,data,callback)
// // {
// //     try{
// //         var result = await toDo.findByIdAndUpdate(id,{
// //             title:data.title,
// //             isCompleted:data.isCompleted,
// //             isDeleted:data.isDeleted
// //         });
// //         callback(null,result);
// //     }
// //     catch(err){
// //         callback(err,null);
// //     }
// // }

// // module.exports.deleteToDoById = async function(id, callback)
// // {
// //     try{
// //         var result = await toDo.findByIdAndUpdate(id,{isDeleted:true});
// //         callback(null,result);
// //     }
// //     catch(err)
// //     {
// //         callback(err,null);
// //     }
// // }



// const todoModel = require("../models/todoModel");

// /*
// 1. createTodo
// 2. getAllTodos
// 3. getSingleTodoById
// 4. getTodosByQuery
// 5. updateTodoById
// 6. DeleteTodoById
// */

// module.exports.createTodo = async function(todo,callback){
//     try{
//         var newTodo = new todoModel(todo);
//         var result = await newTodo.save();
//         callback(null,result);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }
// module.exports.getAllTodos = async function(callback){
//     try{
//         var todos = await todoModel.find({isCompleted: false,isDeleted: false});
//         callback(null,todos);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }

// module.exports.getTodosByQuery = async function(query,callback){
//     try{
//         var todos = await todoModel.find(query);
//         callback(null,todos);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }

// module.exports.getSingleTodoById = async function(id,callback){
//     try{
//         var todo = await todoModel.findOne(id);
//         callback(null,todo);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }

// module.exports.updateTodoById = async function(id,data,callback){
//     try{
//         var todo = {
//             _id:id
//             //_id: new mongoose.Types.ObjectId(id)
//         };
//         var result = await todoModel.updateOne(todo,data);
//         callback(null,result);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }

// module.exports.deleteTodoById = async function(id,callback){
//     try{
//         var todo = {
//             _id: id,
//         };
//         var result = await todoModel.updateOne(todo,{isDeleted: true});
//         callback(null,result);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }


import mongoose from "mongoose";
import toDoModel from "../models/todoModel.js";

export async function createTodo(item, callback){
    try{
        var new_todo = new toDoModel(item);
        var result = await new_todo.save();
        callback(null,result);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function getAllTodos(callback){
    try{
        var items = await toDoModel.find({isDeleted : false, isCompleted : false});
        callback(null,items);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function getAllCompleted(callback){
    try{
        var items = await toDoModel.find({isCompleted : true, isDeleted : false});
        callback(null,items);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function getAllDeleted(callback){
    try{
        var items = await toDoModel.find({isDeleted : true});
        callback(null,items);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function getTodoByQuery(query, callback){
    try{
        var items = await toDoModel.find(query);
        callback(null,items);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function getSingleTodoById(id, callback){
    try{
        var item = await toDoModel.find({_id : id});
        callback(null,item);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function updateTodoById(id, data, callback){
    try{
        var result = await toDoModel.updateOne({_id : id},data);
        callback(null,result);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function deleteTodoById(id, callback){
    try{
        var data = {isDeleted : true};
        var result = await toDoModel.updateOne({_id : id},data);
        callback(null,result);
    }
    catch(err){
        console.error(err);
        callback(err,null);
    }
}

export async function hardDelete(callback){
    try{
        var result = await toDoModel.deleteMany({});
        callback(null, result);
    }
    catch(err){
        callback(err,null);
    }
}