
// Global stream variable
let stream = null;

// ===========================
// Start Camera
// ===========================
async function startCamera() {

    try {

        // Ask for camera & microphone permission
        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        // Display video
        const localVideo = document.getElementById("localVideo");
        localVideo.srcObject = stream;

        console.log("Camera and microphone started");

    } catch (error) {

        console.error("Camera Error:", error);

        alert("Unable to access camera or microphone.\n\nPlease allow camera permission.");

    }

}

// ===========================
// Share Screen
// ===========================
async function shareScreen() {

    try {

        const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true
        });

        // Show shared screen in local video
        document.getElementById("localVideo").srcObject = screenStream;

        console.log("Screen sharing started");

        // When screen sharing stops, return to camera
        screenStream.getVideoTracks()[0].onended = function () {

            if (stream) {

                document.getElementById("localVideo").srcObject = stream;

            }

        };

    } catch (error) {

        console.error("Screen Share Error:", error);

        alert("Screen sharing cancelled.");

    }

}

// ===========================
// Mute / Unmute
// ===========================
function muteAudio() {

    if (!stream) {

        alert("Start the camera first.");
        return;

    }

    const audioTrack = stream.getAudioTracks()[0];

    if (!audioTrack) {

        alert("No microphone found.");
        return;

    }

    audioTrack.enabled = !audioTrack.enabled;

    if (audioTrack.enabled) {

        alert("Microphone Unmuted");

    } else {

        alert("Microphone Muted");

    }

}

// ===========================
// End Meeting
// ===========================
function endMeeting() {

    if (stream) {

        stream.getTracks().forEach(track => track.stop());

        document.getElementById("localVideo").srcObject = null;

        stream = null;

    }

    alert("Meeting Ended");

    window.location.href = "dashboard.html";

}
// ===========================
// Send Chat Message
// ===========================
function sendMessage() {

    let message = document.getElementById("message").value.trim();

    if (message === "") {

        alert("Please enter a message.");
        return;

    }

    let chatBox = document.getElementById("chatBox");

    let newMessage = document.createElement("p");

    newMessage.innerHTML = "<strong>You:</strong> " + message;

    chatBox.appendChild(newMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    document.getElementById("message").value = "";

}