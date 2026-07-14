// Welcome Message
console.log("Welcome to Video Communication and Virtual Collaboration");

// Button Animation
const button = document.querySelector(".btn");

if (button) {
    button.addEventListener("click", function () {
        alert("Welcome! Let's create your account.");
    });
}
// Login Form
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        window.location.href = "dashboard.html";
    });
}