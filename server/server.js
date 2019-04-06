// to specifiy the path (before we used express.static())
// server side
const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage , generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/user');
const publicPath = path.join(__dirname,'../public');

// express
// 

var app = express();

// for heroku

const port = process.env.PORT ||3000;

// socket setup
var server = http.createServer(app);
var io  = socketIO(server);                            //http://localhost:3000/socket.io/socket.io.js (js file appears)
var users = new Users();
		
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

    // socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));


   // socket.broadcast.emit from Admin text New User joined
   socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));
     
   //  socket.broadcast.emit('newMessage',{
   // 	  from : 'Admin',
   // 	  text : 'New User joined',
   // 	  createdAt : new Date().getTime()
   // });
   

   // joinig room part
   
   socket.on('join',(params,callback)=>{

   	if(!isRealString(params.name) || !isRealString(params.room)){
   		return callback('name and room name are required');
   	}
    
 	socket.join(params.room);
    users.removeUser(socket.id);
 	users.addUser(socket.id,params.name,params.room);

 	io.to(params.room).emit('updateUserList',users.getUserList(params.room)); 
 	//socket.leave('THe office fans') ; name of room
 	// io.emit ---  io.to('The office fanse').emit
 	// socket.broadacast.emit  ---> socket.broadcast.to('the office fans').emit
 	// socket.emit() --> not used
 	
 	socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
 	socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',params.name+"has joined room")); 

   	callback();

   });

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
 	      
 	      callback('');
 	  
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
		console.log("yaha");
        console.log(users);
        console.log("lol")
        console.log(users.getUser(socket.id));
		var user = users.removeUser(socket.id);
		if(user){
			console.log("ghuso");
			io.to(user.room).emit('updateUserList',users.getUserList(user.room));
			io.to(user.room).emit('newMessage',generateMessage('Admin',user.name+"has left"));
		}
	});
});


server.listen(port,()=>{
	console.log("Server started");
});
