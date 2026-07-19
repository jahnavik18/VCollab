document.getElementById("meetingForm")
.addEventListener("submit", async function(event) {

    event.preventDefault();


    // Generate Meeting ID
    let meetingID = Math.floor(100000 + Math.random() * 900000);


    // Collect form data
    let meetingData = {

        meetingId: meetingID.toString(),

        title: document.getElementById("title").value,

        description: document.getElementById("description").value,

        date: document.getElementById("date").value,

        time: document.getElementById("time").value

    };


    // Send data to backend
    const response = await fetch(
        "http://localhost:5000/api/meetings/create",
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(meetingData)

        }
    );


    const data = await response.json();


    if(response.ok){

        // Save meeting details
        localStorage.setItem(
            "meetingData",
            JSON.stringify(data.meeting)
        );


        alert(
            "Meeting Created Successfully!\nMeeting ID: " 
            + meetingID
        );


        // Open meeting room
        window.location.href = "meeting.html";

    }
    else{

        alert(data.message);

    }

});