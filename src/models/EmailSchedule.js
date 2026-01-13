const mongoose = require("mongoose");

const EmailScheduleSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "SENT", "FAILED"],
      default: "PENDING",
    },
    error: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmailSchedule", EmailScheduleSchema);
