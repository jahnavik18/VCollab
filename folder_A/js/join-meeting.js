/*===========join meeting page================*/
document.getElementById("joinForm").addEventListener("submit", function(event){

    event.preventDefault();

    const meetingId = document.getElementById("meetingId").value;
    const passcode = document.getElementById("passcode").value;

    if(meetingId === "" || passcode === ""){
        alert("Please enter all details.");
    }
    else{
        alert("Joining Meeting...");
        window.location.href = "meeting.html";
    }

});