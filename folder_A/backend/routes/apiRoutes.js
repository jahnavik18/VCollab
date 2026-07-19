const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/userController");

// Test Route
router.get("/", (req, res) => {
    res.json({
        message: "API is working!"
    });
});

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

module.exports = router;