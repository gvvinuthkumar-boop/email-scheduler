const express = require("express");
const router = express.Router();

const {
  createEmailSchedule,
  getAllEmails,
  getEmailById,
  updateEmailSchedule,
  deleteEmailSchedule,
  getFailedEmails,
} = require("../controllers/email.controller");

router.post("/", createEmailSchedule);
router.get("/", getAllEmails);
router.get("/failed", getFailedEmails);
router.get("/:id", getEmailById);
router.put("/:id", updateEmailSchedule);
router.delete("/:id", deleteEmailSchedule);

module.exports = router;
