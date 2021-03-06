const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    participants: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }],
        validate: [participantsLimit, 'Needs to be 2 participants']
    },
    roomId: {
        type: String,
        // required: true
    }
}, { timestamps: true });

function participantsLimit(val) {
    return val.length == 2;
}

module.exports = Room = mongoose.model("rooms", RoomSchema);