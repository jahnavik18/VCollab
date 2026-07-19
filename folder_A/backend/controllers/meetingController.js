const Meeting = require("../models/Meeting");


// Create Meeting
exports.createMeeting = async (req, res) => {

    try {

        const { title, description, meetingId, date, time, createdBy } = req.body;


        const newMeeting = new Meeting({

            title,
            description,
            meetingId,
            date,
            time,
            createdBy

        });


        await newMeeting.save();


        res.status(201).json({

            message: "Meeting created successfully",
            meeting: newMeeting

        });


    } catch (error) {

        res.status(500).json({

            message: "Error creating meeting",
            error: error.message

        });

    }

};



// Get All Meetings
exports.getMeetings = async (req, res) => {

    try {

        const meetings = await Meeting.find();


        res.status(200).json(meetings);


    } catch (error) {

        res.status(500).json({

            message: "Error fetching meetings",
            error: error.message

        });

    }

};
// Join Meeting - Find meeting by ID
exports.joinMeeting = async (req, res) => {

    try {

        const { meetingId } = req.body;


        const meeting = await Meeting.findOne({
            meetingId: meetingId
        });


        if(!meeting){

            return res.status(404).json({
                message: "Meeting not found"
            });

        }


        res.status(200).json({

            message: "Meeting found",
            meeting: meeting

        });


    } catch(error){

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }

};