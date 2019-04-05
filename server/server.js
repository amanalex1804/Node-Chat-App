// to specifiy the path (before we used express.static())
// server side
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

	// socket.emit('newMessage',{
	// 	from : 'Johnsnow',
	// 	text : 'see you then',
	// 	createdAt : 123123
	// })

	// socket.emit('newEmail',{
	// 	from : 'mike@example.com',
	// 	test: 'hello'
	// });
    
    // for send email type (example)
// socket.on('createEmail',(newEmail) =>{
//    console.log('At server side',newEmail)
// });


 //message part implemtation
   socket.on('createMessage',(message) =>{
   	 console.log('createMessage',message);
 	
 	 io.emit('newMessage',{
 	 	from : message.from,
 	 	text : message.text,
 	 	createdAt : new Date().getTime()
 	 })

   });

	socket.on('disconnect',()=>{
		console.log('User was disconnect');
	});
});


server.listen(port,()=>{
	console.log("Server started");
});
