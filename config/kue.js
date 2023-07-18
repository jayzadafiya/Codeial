const kue =require('kue');

//queue is group of simlilar jobs or array of tasks
//kue work like event loop in node.js

const queue=kue.createQueue();
module.exports = queue;