//require("dotenv").config();

import dotenv from "dotenv";
dotenv.config();

//const userlib=require("./backend/lib/userlib");

import userlib from "./backend/lib/userlib.js";

const todolib=require("./backend/lib/todolib");
const mongoose=require("mongoose");
const {request} = require('express');

const app = express();
const port = process.env.PORT || 5010;
const options={
	extensions:['htm','html','css','js','ico','jpg','jpeg','png','svg','pdf'],
	index:['index.html']
}
app.use(express.static("public"));
app.use(express.json());
app.get("/", function(req, res){
	//res.send("Hey! I am Divya.");
	res.sendFile(__dirname+"/index.html");
});

app.get("/about", function(req, res){
	res.sendFile(__dirname+"/about.html");
});

app.get("/weather", function(req, res){
	res.sendFile(__dirname+"/weather.html");
});

app.get("/resume", function(req, res){
	res.sendFile(__dirname+"/resume.html");
});

app.get("/testresume", function(req, res){
	res.sendFile(__dirname+"/testresume.html");
});

app.get("/card", function(req, res){
	res.sendFile(__dirname+"/card.html");
});

app.get("/pics", function(req, res){
	res.sendFile(__dirname+"/pics.html");
});

app.get("/weather", function(req, res){
	res.sendFile(__dirname+"/weather.html");
});

// app.get("/todo", function(req, res){
// 	res.sendFile(__dirname+"/todo.html");
// });


app.get("/todos", function(req, res){
	todolib.getAllTodos(function(err,todos){
		if(err)
		{
			res.json({status:"error",message:err,data:null});
		}
		else
		{
			res.json({status:"success",data:todos});
		}
	});
	//res.sendFile(__dirname+"/frontend/todo.html");
});


app.post('/api/todos',function(req,res){
	const todo=req.body;
	todolib.createTodo(todo,function(err,dbtodo){
		if(err)
		{
			res.json({status:"error",message:err,data:null});
		}
		else
		{
			res.json({status:"success",data:dbtodo});
		}
	});
});

app.put('/api/todos/:todoid',function(req,res){
	const todo=req.body;
	const todoid=req.params.todoid;
	todolib.updateTodoById(todoid,todo,function(err,dbtodo){
		if(err)
		{
			res.json({status:"error",message:err,data:null});
		}
		else
		{
			res.json({status:"success",data:dbtodo});
		}
	});
});

app.delete('/api/todos/todoid',function(req,res){
	const todoid=req.params.todoid;
	todolib.deleteTodoById(todoid,function(err,dbtodo){
		if(err)
		{
			res.json({status:"error",message:err,data:null});
		}
		else
		{
			res.json({status:"success",data:dbtodo});
		}
	});
});


app.get("/darkmode", function(req, res){
	res.sendFile(__dirname+"/darkmode.html");
});
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{},function(err){
	if(err)
	{
		console.error(err);
	}
	else{
		console.log("DB Connected.");
		userlib.getAllUsers(function(err,res){
			if(err)
			{
				console.error(err);
			}
			else
			{
				console.log(res);
			}
		});
		//userlib.createUser({
		//	username:"beingzero",
		//	yearOfGraduation:2030
		//}, function(err,result){
		/*	if(err)
			{
				console.error(err);
			}
			else
			{
				console.log(result);
			}
		});
		*/


		//TODO: do not create a user if at least one user exists in the collection
		//userlib.createFirstUser(function(err,res){
		//	if(err)
		//	{
		//		//console.error(err);
		//	}
		//	else
		//	{
		//		console.log(res);
		//	}
		//});

		//userlib.updateUser(function(err,result){
		//	if(err)
		//	{
		//		console.error(err);
		//	}
		//	else
		//	{
		//		console.log(result);
		//	}
	//	});
	/*	
	userlib.deleteUser("divya",function(err,result){
			if(err)
			{
				console.error(err);
			}
			else
			{
				console.log(result);
			}
		});
		*/
		app.listen(port, function(){
			console.log("Server running on http://localhost:"+port);
			console.log(`Server running on http://localhost:${port}`);
		});		
	}
});
