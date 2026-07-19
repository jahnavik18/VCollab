const express = require("express");

const router = express.Router();

const {
    createMeeting,
    getMeetings,
    joinMeeting
} = require("../controllers/meetingController");


// Create Meeting
router.post("/create", createMeeting);


// Get Meetings
router.get("/", getMeetings);


// Join Meeting
router.post("/join", joinMeeting);


module.exports = router;