const user = JSON.parse(localStorage.getItem("user"));

if(user){
    document.getElementById("username").innerText = user.name;
}
else{
    window.location.href = "login.html";
}