//const userModel = require("../models/userModel");

import userModel from "../models/userModel.js"

export async function getAllUsers(callback)
{
    try{
        var users = await userModel.find({isDeleted:false});
        callback(null,users);
    }
    catch(err){
        callback(err,null);
    }
}

export async function createFirstUser(callback)
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

export async function createUser(user,callback)
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


export async function updateUser(name,data,callback)
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
export async function getUserByFilter(filter,callback)
{
    try{
        var result=await userModel.findOne(filter);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}
export async function deleteUser(name, callback)
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