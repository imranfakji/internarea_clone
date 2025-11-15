const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    category: String,
    aboutCompany: String,
    aboutInternship: String,
    whoCanApply: String,
    perks: String,
    numberOfOpening: Number,
    stipend: String,
    startDate: String,
    additionalInfo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
