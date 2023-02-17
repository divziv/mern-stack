require("dotenv").config();
const userlib=require("./backend/lib/userlib");
const mongoose=require("mongoose");

const express = require('express');
const app = express();
const port = process.env.PORT || 5010;
app.use(express.static("public"));
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
