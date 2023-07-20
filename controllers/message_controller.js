const Message = require("../models/messageModel");


module.exports.displayMessages = async function(req, res) {
    try {
        const chatroom = req.query.chatroom;
        const messages = await Message.find({ chatroom }).sort({ createdAt: 1 }).exec();
        res.json({ messages });
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}