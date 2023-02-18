const { updateOne } = require("../models/toDo");
const toDo = require("../models/toDo");


module.exports.getAllToDos = async function(callback)
{
    try{
        var todos = await toDo.find({isDeleted:false});
        callback(null,todos);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.getToDosByQuery = async function(query,callback)
{
    try{
        var result=await toDo.find(query);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.getSingleToDoById = async function(id,callback)
{
    try{
        var result=await toDo.findById(id);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.createToDo = async function(data,callback)
{
    try{
        var todo = new toDo({
            title:data.title,
            createdAt:data.createdAt,
            isCompleted:data.isCompleted,
            isDeleted:data.isDeleted
        });
        var result=await toDo.save();
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.updateToDoById = async function(id,data,callback)
{
    try{
        var result = await toDo.findByIdAndUpdate(id,{
            title:data.title,
            isCompleted:data.isCompleted,
            isDeleted:data.isDeleted
        });
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.deleteToDoById = async function(id, callback)
{
    try{
        var result = await toDo.findByIdAndUpdate(id,{isDeleted:true});
        callback(null,result);
    }
    catch(err)
    {
        callback(err,null);
    }
}