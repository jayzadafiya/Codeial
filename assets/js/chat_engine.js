class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.messageHistory = {};

        //here io is globle case
        this.socket=io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    //make a connecton between server and cline
    connectionHandler(){

        let self=this;

        //1st event
        this.socket.on('connect',function(){
            console.log('connection established using sockets...');

            self.socket.emit('join_room',{
                //data for chatting
                user_email:self.userEmail,
                chatroom:'codeial'//room name in which both client can chat
            });

            // Request previous messages when the user joins the chatroom
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial',
            });



            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
                self.fetchPreviousMessages();
            })
        });

        //send a message by clicking,the send message button
        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();

            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codeial'
                })
            }
        })

        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);

            let newMessage=$('<li>');

            let messageType='other-message';

            if(data.user_email==self.userEmail){
                messageType="self-message";
            }

            newMessage.append($('<span>',{
                'html':data.message,
            }));

            newMessage.append($("<sub>",{
                'html':data.user_email,
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);

            // Scroll to the bottom after displaying the message
            self.scrollToBottom();

        });


    }

    scrollToBottom() {
        const chatMessagesList = $('#chat-messages-list');
        chatMessagesList.scrollTop(chatMessagesList[0].scrollHeight);
    }

    // Fetch previous messages from the server
    fetchPreviousMessages() {
        let self = this;
        $.ajax({
            type: 'GET',
            url: '/api/messages', // Change the API endpoint as per your server route
            data: {
                chatroom: 'codeial',
            },
            success: function (data) {
                if (data.messages) {
                    data.messages.forEach(function (message) {
                        // self.messageHistory[message._id] = message;
                        self.displayMessage(message);
                    });
                    self.scrollToBottom();
                }
            },
            error: function (err) {
                console.error('Error fetching previous messages:', err);
            },
        });
    }

    // // Display a message in the chat box
    displayMessage(data) {
        if (!this.messageHistory[data._id]) {
            // Check if the message is not already displayed
            this.messageHistory[data._id] = data;
            let newMessage = $('<li>');
            
            let messageType = data.user_email === this.userEmail ? 'self-message' : 'other-message';

            newMessage.append(
                $('<span>', {
                    html: data.message,
                })
            );

            newMessage.append(
                $('<sub>', {
                    html: data.user_email,
                })
            );

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        }
    }

}