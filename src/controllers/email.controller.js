const EmailSchedule = require("../models/EmailSchedule");

/**
 * CREATE email schedule
 * POST /emails
 */
exports.createEmailSchedule = async (req, res) => {
  try {
    const { to, subject, body, scheduledAt } = req.body;

    const email = await EmailSchedule.create({
      to,
      subject,
      body,
      scheduledAt,
    });

    res.status(201).json(email);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET all scheduled emails
 * GET /emails
 */
exports.getAllEmails = async (req, res) => {
  try {
    const emails = await EmailSchedule.find().sort({ scheduledAt: 1 });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET single email by ID
 * GET /emails/:id
 */
exports.getEmailById = async (req, res) => {
  try {
    const email = await EmailSchedule.findById(req.params.id);

    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json(email);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE / RESCHEDULE email
 * PUT /emails/:id
 */
exports.updateEmailSchedule = async (req, res) => {
  try {
    const email = await EmailSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json(email);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE email schedule
 * DELETE /emails/:id
 */
exports.deleteEmailSchedule = async (req, res) => {
  try {
    const email = await EmailSchedule.findByIdAndDelete(req.params.id);

    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json({ message: "Email deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET failed / unsent emails
 * GET /emails/failed
 */
exports.getFailedEmails = async (req, res) => {
  try {
    const emails = await EmailSchedule.find({
      status: { $in: ["FAILED", "PENDING"] },
    });

    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
