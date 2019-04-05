// client side -- see on chrome (Ctrl+shift+i)

var socket = io();


 socket.on('connect',function(){
 	console.log('connected to server');

    // to createmail

 	// socket.emit('createEmail',{
 	// 	to : 'jen@example.com',
 	// 	text :'yolo'
 	// })
 	
 	// socket.emit('createMessage',{
 	// 	from : 'Andrew',
 	// 	text : 'worked'
 	// });
 });

 // ()=>   --> crashes on opening with mobiles
 // socket.on('disconnect',()=>{
 // 	console.log('Disconnected from server');
 // });
 
 socket.on('disconnect',function(){
 	console.log('Disconnected from server');
 });

 // socket.on('newEmail',function(email){
 // 	console.log('New email',email);
 // })
 

 socket.on('newMessage',function(message){
 	console.log('newMessage',message);
 })