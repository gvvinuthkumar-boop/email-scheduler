const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  body: String,
  scheduledAt: Date,
  status: {
    type: String,
    default: "scheduled"
  }
});

module.exports = mongoose.model("Email", emailSchema);
