

// var date  = new Date();
// var months = ['Jan','Feb','Mar','Apr','May','Jun'];
// console.log(date.getMonth());

var moment = require('moment');

var date = moment();
console.log(date.format('MMM Do,YYY'));

console.log(date.format('h:mm a Do MMM YYYY'));