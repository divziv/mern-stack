// const { updateOne } = require("/backend/models/todoModel");
// const toDo = require("/backend/models/todoModel");


// module.exports.getAllToDos = async function(callback)
// {
//     try{
//         var todos = await toDo.find({isDeleted:false});
//         callback(null,todos);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }

// module.exports.getToDosByQuery = async function(query,callback)
// {
//     try{
//         var result=await toDo.find(query);
//         callback(null,result);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }

// module.exports.getSingleToDoById = async function(id,callback)
// {
//     try{
//         var result=await toDo.findById(id);
//         callback(null,result);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }

// module.exports.createToDo = async function(data,callback)
// {
//     try{
//         var todo = new toDo({
//             title:data.title,
//             createdAt:data.createdAt,
//             isCompleted:data.isCompleted,
//             isDeleted:data.isDeleted
//         });
//         var result=await toDo.save();
//         callback(null,result);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }

// module.exports.updateToDoById = async function(id,data,callback)
// {
//     try{
//         var result = await toDo.findByIdAndUpdate(id,{
//             title:data.title,
//             isCompleted:data.isCompleted,
//             isDeleted:data.isDeleted
//         });
//         callback(null,result);
//     }
//     catch(err){
//         callback(err,null);
//     }
// }

// module.exports.deleteToDoById = async function(id, callback)
// {
//     try{
//         var result = await toDo.findByIdAndUpdate(id,{isDeleted:true});
//         callback(null,result);
//     }
//     catch(err)
//     {
//         callback(err,null);
//     }
// }



const todoModel = require("../models/todoModel");

/*
1. createTodo
2. getAllTodos
3. getSingleTodoById
4. getTodosByQuery
5. updateTodoById
6. DeleteTodoById
*/

module.exports.createTodo = async function(todo,callback){
    try{
        var newTodo = new todoModel(todo);
        var result = await newTodo.save();
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}
module.exports.getAllTodos = async function(callback){
    try{
        var todos = await todoModel.find({isCompleted: false,isDeleted: false});
        callback(null,todos);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.getTodosByQuery = async function(query,callback){
    try{
        var todos = await todoModel.find(query);
        callback(null,todos);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.getSingleTodoById = async function(id,callback){
    try{
        var todo = await todoModel.findOne(id);
        callback(null,todo);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.updateTodoById = async function(id,data,callback){
    try{
        var todo = {
            _id:id
            //_id: new mongoose.Types.ObjectId(id)
        };
        var result = await todoModel.updateOne(todo,data);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.deleteTodoById = async function(id,callback){
    try{
        var todo = {
            _id: id,
        };
        var result = await todoModel.updateOne(todo,{isDeleted: true});
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}