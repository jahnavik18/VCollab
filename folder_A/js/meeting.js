const socket = io("http://192.168.1.32:5000");
const roomId = "VCOLLAB_ROOM_123";

socket.emit("join-room", roomId);

socket.on("connect", () => {
    console.log("Connected to Socket.IO:", socket.id);
});
let localStream = null;
let screenStream = null;

// Start Camera
async function startCamera() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        const video = document.getElementById("localVideo");

        if (video) {
            video.srcObject = localStream;
        }

        console.log("Camera started successfully");

    } catch (error) {
        console.error("Camera error:", error);
        alert("Camera permission was denied or camera is not available.");
    }
}


// Mute / Unmute
function muteAudio() {
    if (!localStream) {
        alert("Please start the camera first.");
        return;
    }

    const audioTrack = localStream.getAudioTracks()[0];

    if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;

        console.log(
            audioTrack.enabled
                ? "Microphone unmuted"
                : "Microphone muted"
        );
    }
}


// Share Screen
async function shareScreen() {
    try {
        screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true
        });

        const video = document.getElementById("localVideo");

        if (video) {
            video.srcObject = screenStream;
        }

        console.log("Screen sharing started");

    } catch (error) {
        console.error("Screen sharing error:", error);
    }
}


// End Meeting
function endMeeting() {

    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }

    if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
    }

    const video = document.getElementById("localVideo");

    if (video) {
        video.srcObject = null;
    }

    alert("Meeting ended");

    // Go back to dashboard
    window.location.href = "dashboard.html";
}
// Chat Functionality
function sendMessage() {

    const messageInput = document.getElementById("message");
    const chatBox = document.getElementById("chatBox");

    const message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    const messageElement = document.createElement("p");

    messageElement.textContent = message;

    chatBox.appendChild(messageElement);

    messageInput.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;
}


// Send message by pressing Enter
function handleEnter(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

}
async function checkBackend() {
    try {
        const response = await fetch("https://vcollab-ee2a.onrender.com/api");

        const data = await response.json();

        console.log("Backend Response:", data);

    } catch (error) {
        console.error("Backend connection error:", error);
    }
}
checkBackend();