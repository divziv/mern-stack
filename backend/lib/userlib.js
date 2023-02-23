const userModel = require("../models/userModel");

module.exports.getAllUsers = async function(callback)
{
    try{
        var users = await userModel.find({isDeleted:false});
        callback(null,users);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.createFirstUser = async function(callback)
{
    try{
        var user = {
            username:"divya",
            yearOfGraduation:2024
        };
        var newUser =  new userModel(user);
        var createdUser = await newUser.save();
        callback(null,createdUser);
    }
    catch(err){
        callback(err,null);
    }
}

module.exports.createUser = async function(user,callback)
{
    try{
        var newUser =  new userModel(user);
        var createdUser = await newUser.save();
        callback(null,createdUser);
    }
    catch(err){
        callback(err,null);
    }
}


module.exports.updateUser = async function(name,data,callback)
{
    try{
        var query = {
            username: name
        };
        var result = await userModel.updateOne(query,data);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}
module.exports.getUserByFilter = async function(filter,callback)
{
    try{
        var result=await userModel.findOne(filter);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}
module.exports.deleteUser = async function(name, callback)
{
    try{
        var query = {
            username:name
        };
        var result = await userModel.updateOne(query,{isDeleted:true});
        callback(null,result);
    }
    catch(err)
    {
        callback(err,null);
    }
}