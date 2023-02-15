require("dotenv").config();
const userlib=require("./backend/lib/userlib");
const mongoose=require("mongoose");

const express = require('express');
const app = express();
const port = process.env.PORT || 5010;

app.get("/", function(req, res){
	//res.send("Hey! I am Divya.");
	res.sendFile(__dirname+"/index.html");
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
		//TODO: do not create a user if at least one user exists in the collection
		userlib.createFirstUser(function(err,res){
			if(err)
			{
				//console.error(err);
			}
			else
			{
				console.log(res);
			}
		});
		app.listen(port, function(){
			console.log("Server running on http://localhost:"+port);
			console.log(`Server running on http://localhost:${port}`);
		});		
	}

});
