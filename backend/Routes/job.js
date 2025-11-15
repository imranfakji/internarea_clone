const express = require("express");
const router = express.Router();
const Job = require("../Model/Job");

// ✅ Post a new internship
router.post("/post", async (req, res) => {
  console.log("📩 POST /api/job/post called");
  console.log("📥 Body received:", req.body);

  try {
    const requiredFields = ["title", "company", "location", "category"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Missing field: ${field}` });
      }
    }

    const jobdata = new Job({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      category: req.body.category,
      aboutCompany: req.body.aboutCompany,
      aboutInternship: req.body.aboutInternship, // ✅ fixed
      whoCanApply: req.body.whoCanApply,
      perks: req.body.perks,
      numberOfOpening: req.body.numberOfOpening,
      stipend: req.body.stipend, // ✅ fixed
      startDate: req.body.startDate,
      additionalInfo: req.body.additionalInfo, // ✅ fixed
    });

    const data = await jobdata.save();
    console.log("✅ Internship saved:", data);
    res.status(201).json(data);
  } catch (error) {
    console.error("❌ Error saving internship:", error);
    res.status(500).json({ message: "Error posting internship", error: error.message });
  }
});

// ✅ Fetch all internships
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching internships", error: error.message });
  }
});

module.exports = router;
