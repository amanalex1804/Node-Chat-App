// to specifiy the path (before we used express.static())

const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');

// express
// 

var app = express();

// for heroku

const port = process.env.PORT ||3000;

// socket setup
var server = http.createServer(app);
var io  = socketIO(server);  //http://localhost:3000/socket.io/socket.io.js (js file appears)


app.use(express.static(publicPath));


//as a event listener

io.on('connection',(socket)=>{
	console.log('new user connected');

	socket.on('disconnect',()=>{
		console.log('User was disconnect');
	});
});


server.listen(port,()=>{
	console.log("Server started");
});
