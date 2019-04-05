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

app.listen(port,()=>{
	console.log("Server started");
})

