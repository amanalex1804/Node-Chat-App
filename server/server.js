// to specifiy the path (before we used express.static())
// server side
const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage , generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');

// express
// 

var app = express();

// for heroku

const port = process.env.PORT ||3000;

// socket setup
var server = http.createServer(app);
var io  = socketIO(server);                            //http://localhost:3000/socket.io/socket.io.js (js file appears)


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
   

   // socket.emit from Admin text welcome to chat app(only me) io.emit sends to all
   // socket.emit('newMessage',{
   // 	  from : 'Admin',
   // 	  text : 'welcome to chat app',
   // 	  createdAt : new Date().getTime()
   // });

     socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));


   // socket.broadcast.emit from Admin text New User joined
   socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));
     
   //  socket.broadcast.emit('newMessage',{
   // 	  from : 'Admin',
   // 	  text : 'New User joined',
   // 	  createdAt : new Date().getTime()
   // });

 //message part implemtation
 //
  // for acknowledging
   socket.on('createMessage',(message,callback) =>{
   	 console.log('createMessage',message);
 	
 	 //message to all including me(sender)
 	 // io.emit('newMessage',{
 	 // 	from : message.from,
 	 // 	text : message.text,
 	 // 	createdAt : new Date().getTime()
 	 // });

 	 	 io.emit('newMessage',generateMessage(message.from,message.text));
 	      
 	      callback('This is from the server side');
 	  
 	  // print wtell other user that this user has joined
 	  //send messgae to everbody but not me
 	  // socket.broadcast.emit('newMessage',{
 	  // 	from : message.from,
 	  // 	text : message.text,
 	  // 	createdAt : new Date().getTime()
 	  // })


   });

// simply send latitude nd longitude
//   socket.on('createLocationMessage',(coords) =>{
  // 	 io.emit('newMessage',generateMessage('Admin',coords.latitude +" "+ coords.longitude));
   //});
   
   // for sending the links
     socket.on('createLocationMessage',(coords) =>{
  	 io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude , coords.longitude));
   });
   


	socket.on('disconnect',()=>{
		console.log('User was disconnect');
	});
});


server.listen(port,()=>{
	console.log("Server started");
});
