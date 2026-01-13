const cron = require("node-cron");
const EmailSchedule = require("../models/EmailSchedule");
const { sendEmail } = require("../services/mail.service");

console.log("✅ email.job.js loaded");

cron.schedule("* * * * *", async () => {
  console.log("Running email scheduler job...");

  const emails = await EmailSchedule.find({
    status: "PENDING",
    scheduledAt: { $lte: new Date() },
  });

  for (let email of emails) {
    try {
      await sendEmail(email);
      email.status = "SENT";
      email.error = null;
    } catch (err) {
      email.status = "FAILED";
      email.error = err.message;
    }

    await email.save();
  }
});
