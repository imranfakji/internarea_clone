const express = require("express");
const router = express.Router();

const adminuser = "admin";
const adminpass = "admin";

router.post("/adminlogin", (req, res) => {
  console.log("📥 Body received from frontend:", req.body); // 👈 Debug line

  const { username, password } = req.body; // Check these field names

  if (username === adminuser && password === adminpass) {
    console.log("✅ Login successful");
    return res.status(200).send("admin is here");
  } else {
    console.log("❌ Invalid credentials:", username, password);
    return res.status(401).send("Invalid credentials");
  }
});

module.exports = router;
