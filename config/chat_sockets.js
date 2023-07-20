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
    });
    
}