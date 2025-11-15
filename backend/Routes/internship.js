const express = require("express");
const router = express.Router();
const Internship = require("../Model/Internship");

// POST - create internship
router.post("/", async (req, res) => {
  console.log("✅ POST /api/internship called");
  console.log("📦 Incoming body:", req.body);

  try {
    const internshipData = new Internship(req.body);
    console.log("🧩 Internship model created:", internshipData);

    const savedData = await internshipData.save();
    console.log("✅ Data saved successfully:", savedData);

    res.status(201).json(savedData);
  } catch (error) {
    console.log("❌ Error while saving internship:", error.message);
    console.log("🧠 Full error object:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET - all internships
router.get("/", async (req, res) => {
  console.log("✅ GET /api/internship called");
  try {
    const data = await Internship.find();
    console.log("📦 All internships fetched:", data.length);
    res.status(200).json(data);
  } catch (error) {
    console.log("❌ Error fetching internships:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET - internship by ID
router.get("/:id", async (req, res) => {
  console.log("✅ GET /api/internship/:id called");
  try {
    const data = await Internship.findById(req.params.id);
    if (!data) {
      console.log("⚠️ Internship not found with ID:", req.params.id);
      return res.status(404).json({ error: "Internship not found" });
    }
    console.log("📦 Internship found:", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("❌ Error fetching internship by ID:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
