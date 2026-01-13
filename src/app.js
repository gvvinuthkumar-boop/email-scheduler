const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const emailRoutes = require("./routes/email.routes");

const app = express();

// DB connection
connectDB();

// 🔥 START EMAIL CRON JOB
require("./jobs/email.job");

app.use(express.json());
app.use("/emails", emailRoutes);

app.get("/", (req, res) => {
  res.send("Email Scheduler API is running 🚀");
});

module.exports = app;
