// to specifiy the path (before we used express.static())

const path  = require('path');
const publicPath = path.join(__dirname,'../public');

// express
// 

const express = require('express');
var app = express();

// for heroku

const port = process.env.PORT ||3000;

app.use(express.static(publicPath));

app.get("/",function(req,res){
	res.render("index");
});

app.get("/why",function(req,res){
	res.render("LOL");
});

app.listen(port,()=>{
	console.log("Server started");
});
