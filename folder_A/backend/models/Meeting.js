const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    meetingId: {
        type: String,
        required: true,
        unique: true
    },

    date: {
        type: String
    },

    time: {
        type: String
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });


module.exports = mongoose.model("Meeting", meetingSchema);