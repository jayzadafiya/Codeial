// messageModel.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        user_email: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        chatroom: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
