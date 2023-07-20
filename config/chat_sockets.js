//main server
const cors = require('cors');

module.exports.chatSockets=function(socketServer){

    let io = require("socket.io")(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
        }
    });//heandling connection

    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on("disconnect",function(){
            console.log("socket disconnect");
        })

        //on method call when join_room is emit from chat engine(client)
        socket.on("join_room",function(data){
            console.log('joining request rec.',data);

            socket.join(data.chatroom);//if room exist then user connet toit else room is create and enter user to it

            // for emit in chat room we emit reques by io
            io.in(data.chatroom).emit('user_joined',data);
            //send notification of client to all other usersthet new user is enter in room
        });

        //detect send_message and broadcast to everyone in room
        socket.on('send_message',function(data){
            //within same chat room emit a event
            io.in(data.chatroom).emit('receive_message',data); 
        })  
    });

}