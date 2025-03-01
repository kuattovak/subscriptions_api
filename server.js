require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Check if DATABASE_URL is undefined
// if (!process.env.DATABASE_URL) {
//   console.error("Error: DATABASE_URL is undefined. Make sure .env file is properly loaded.");
//   process.exit(1); // Exit if the database URL is missing
// }

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(express.json())
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)
module.exports = app;
