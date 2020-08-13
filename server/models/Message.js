const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'rooms',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

module.exports = Message = mongoose.model("messages", MessageSchema);