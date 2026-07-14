document.getElementById("meetingForm")
.addEventListener("submit", function(event) {

    event.preventDefault();


    // Generate Meeting ID
    let meetingID = Math.floor(100000 + Math.random() * 900000);


    // Store meeting information

    let meetingData = {

        id: meetingID,

        title: document.getElementById("title").value,

        description: document.getElementById("description").value,

        date: document.getElementById("date").value,

        time: document.getElementById("time").value,

        type: document.getElementById("type").value

    };


    // Save data in browser

    localStorage.setItem(
        "meetingData",
        JSON.stringify(meetingData)
    );


    alert(
        "Meeting Created Successfully!\nYour Meeting ID: " + meetingID
    );


    // Open meeting room

    window.location.href = "meeting.html";


});