require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing! Check Vercel Environment Variables.");
    process.exit(1);
}

mongoose.connect(DATABASE_URL)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(error => {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    });

app.use(express.json());

const subscribersRouter = require("./api/routes/subscribers");
app.use("/api/subscribers", subscribersRouter); // ✅ Adjusted API path

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
