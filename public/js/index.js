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
 	var li = jQuery('<li></li>');
 	console.log("ok" , typeof message.from);
 	console.log(message.from);
 	li.text(message.from +":"+message.text);

 	jQuery('#messages').append(li);


 });


// to acknowledge that messgae has been sent
 // socket.emit('createMessage',{
 // 	from : 'Frank',
 // 	text : 'Hi'
 // },function(data){
 // 	console.log('Got it',data);
 // });


 jQuery('#message-form').on('submit',function(e){

 	e.preventDefault();  // remove page refresesh process

 	socket.emit('createMessage',{
 		from : 'User',
 		text : jQuery('[name=message]').val()
 	},function(){

 	})

 })