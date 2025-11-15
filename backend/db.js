const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DATABASE_URL;

module.exports.connect = async () => {
  try {
    if (!url) {
      throw new Error("❌ DATABASE_URL is missing in .env file");
    }

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database is connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};
