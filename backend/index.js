const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { connect } = require("./db");
const router = require("./Routes/index");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Existing database connection
connect();



// ✅ Schema + Model for tracking logins
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  photo: String,
  ip: String,
  loginTime: { type: Date, default: Date.now },
});

const UserLogin = mongoose.model("UserLogin", userSchema);

// ✅ Route to record Google login
app.post("/api/login", async (req, res) => {
  try {
    const { name, email, photo } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const user = new UserLogin({ name, email, photo, ip });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Route to get all logged-in users (for “Manage Users” page)
app.get("/api/users", async (req, res) => {
  try {
    const users = await UserLogin.find().sort({ loginTime: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Debug root route
app.get("/", (req, res) => {
  console.log("✅ Root route called");
  res.send("Hello, this is the Internshala backend");
});

// Log all requests
app.use((req, res, next) => {
  console.log("➡️ Request received:", req.method, req.url);
  next();
});

// ✅ Use your existing routes (admin, internship, job, etc.)
app.use("/api", router);

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
