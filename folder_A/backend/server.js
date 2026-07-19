require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const apiRoutes = require("./routes/apiRoutes");
const meetingRoutes = require("./routes/meetingRoutes");


// Connect MongoDB
connectDB();


const app = express();

const PORT = process.env.PORT || 5000;


// Create HTTP Server
const server = http.createServer(app);


// Create Socket.IO Server
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


// Middleware
app.use(cors());
app.use(express.json());


// User Routes
app.use("/api", apiRoutes);


// Meeting Routes
app.use("/api/meetings", meetingRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send("Backend is Running Successfully!");
});


// Socket.IO Signaling
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);


    // Join meeting room
    socket.on("join-room", (roomId) => {

        socket.join(roomId);

        console.log(`${socket.id} joined room: ${roomId}`);

        socket.to(roomId).emit("user-joined", socket.id);

    });


    // Send WebRTC offer
    socket.on("offer", (data) => {

        socket.to(data.roomId).emit("offer", data.offer);

    });


    // Send WebRTC answer
    socket.on("answer", (data) => {

        socket.to(data.roomId).emit("answer", data.answer);

    });


    // Send ICE candidate
    socket.on("ice-candidate", (data) => {

        socket.to(data.roomId).emit("ice-candidate", data.candidate);

    });


    // User disconnected
    socket.on("disconnect", () => {

        console.log("User disconnected:", socket.id);

    });

});


// Start Server
server.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});