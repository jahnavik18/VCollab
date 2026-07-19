document.getElementById("joinForm")
.addEventListener("submit", async function(event){

    event.preventDefault();


    const meetingId = document.getElementById("meetingId").value;

    const passcode = document.getElementById("passcode").value;


    if(meetingId === "" || passcode === ""){

        alert("Please enter all details.");
        return;

    }


    try {

        const response = await fetch(
            "http://localhost:5000/api/meetings/join",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    meetingId: meetingId
                })
            }
        );


        const data = await response.json();


        if(response.ok){

            localStorage.setItem(
                "meetingData",
                JSON.stringify(data.meeting)
            );


            alert("Joining Meeting...");


            window.location.href = "meeting.html";

        }
        else{

            alert(data.message);

        }


    } catch(error){

        console.log(error);

        alert("Server error");

    }

});