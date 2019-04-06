// client side -- see on chrome (Ctrl+shift+i)


$(document).ready(function(){
    
     // for autoscrolling
     
     function scrollToBottom(){

     	// selector
     	
     	var messages = jQuery('#messages');
     	var newMessage = messages.children('li:last-child');

     	// height
     	
     	var clientHeight = messages.prop('clientHeight');
     	var scrollTop = messages.prop('scrollTop');
     	var scrollHeight = messages.prop('scrollHeight');
     	var newMessageHeight = newMessage.innerHeight();
     	var lastMessageHeight = newMessage.prev().innerHeight();

     	if(clientHeight + scrollTop +newMessageHeight+ lastMessageHeight>= scrollHeight){
     		messages.scrollTop(scrollHeight);
     	}

     }




  var socket = io();


 socket.on('connect',function(){
 	console.log('connected to server');

 	// for join rooms
 	
 	var params = jQuery.deparam(window.location.search);
 	socket.emit('join',params,function(err){
 		if(err){
 				alert(err);
 				window.location.href='/';
 		}else{
 			console.log('No error');
 		}
 	});

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

 socket.on('updateUserList',function(users){
 	console.log("NAHI PAHUCHE KA");
 	console.log('Users List ',users);
 	var ol = jQuery('<ol></ol>');
 	users.forEach(function(user){
 		ol.append(jQuery('<li></li>').text(user));
 	});

 	jQuery('#users').html(ol);
 	

 });

 // socket.on('newEmail',function(email){
 // 	console.log('New email',email);
 // })
 

 socket.on('newMessage',function(message){
 	// gonna use mustache
 	// 
 	// console.log('newMessage',message);
   
   var formattedTime = moment(message.createdAt).format('h:mm a')



 	// var li = jQuery('<li></li>');
 	// console.log("ok" , typeof message.from);
 	// console.log(message.from);
 	// li.text(message.from +" "+formattedTime+":"+message.text);

 	// jQuery('#messages').append(li);
 	

 	 var template = jQuery('#messages-template').html();

 	// console.log(typeof template);
 	var html = Mustache.render(template,{
 		text : message.text,
 		from : message.from,
 		createdAt : formattedTime
 	});

 	jQuery('#messages').append(html);
 	scrollToBottom();


 });


// to acknowledge that messgae has been sent
 // socket.emit('createMessage',{
 // 	from : 'Frank',
 // 	text : 'Hi'
 // },function(data){
 // 	console.log('Got it',data);
 // });

 // for link of location
 
 socket.on('newLocationMessage',function(message){
   
    var formattedTime = moment(message.createdAt).format('h:mm a')
 // 	var li = jQuery('<li></li>');
 // 	var a = jQuery('<a targrt= "_blank"> MycurrentLocation</a>');
 //      

 // 	li.text(message.from+" "+formattedTime+":");
 // 	a.attr('href',message.url);
 // 	li.append(a);
	// jQuery('#messages').append(li);
	// 
	// 
	

	// use of mustache template
 	 var template = jQuery('#location-messages-template').html();

 	 console.log(message);
 	var html = Mustache.render(template,{
 		from : message.from,
 		url : message.url,
 		createdAt : formattedTime
 	});

 	jQuery('#messages').append(html);
   	scrollToBottom();


 })

 jQuery('#message-form').on('submit',function(e){

 	e.preventDefault();  // remove page refresesh process

    var messageTextbox = jQuery('[name=message');
 	socket.emit('createMessage',{
 		from : 'User',
 		text : messageTextbox.val()
 	},function(){
 			messageTextbox.val('');
 	});

 });


 var locationButton = jQuery('#send-location');

 locationButton.on('click',function(){
 	if(!navigator.geolocation){
 		return alert('Geolocation not supported');
 	}

 	locationButton.attr('disabled','disabled').text('Sending Location...');

 	navigator.geolocation.getCurrentPosition(function(position){
 		console.log(position);
 		locationButton.removeAttr('disabled').text("Send Location");
 		socket.emit('createLocationMessage',{
 			latitude : position.coords.latitude,
 			longitude : position.coords.longitude
 		});

 	},function(){
 			locationButton.removeAttr('disabled').text("Send Location");
 		alert('Unable to fetch location');
 	});


 });

});

