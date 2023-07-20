class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        //here io is globle case
        this.socket=io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    //make a connecton between server and cline
    connectionHandler(){

        //1st event
        this.socket.on('connect',function(){
            console.log('connection established using sockets...');
        })

    }
}