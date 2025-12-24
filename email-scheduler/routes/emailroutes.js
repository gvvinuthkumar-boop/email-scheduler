const express = require("express");
const router = express.Router();
const Email = require("../models/Email");

// CREATE
router.post("/emails", async (req, res) => {
  const email = new Email(req.body);
  await email.save();
  res.send(email);
});

// LIST ALL
router.get("/emails", async (req, res) => {
  const emails = await Email.find();
  res.send(emails);
});

// READ ONE
router.get("/emails/:id", async (req, res) => {
  const email = await Email.findById(req.params.id);
  res.send(email);
});

// UPDATE (Reschedule)
router.put("/emails/:id", async (req, res) => {
  const email = await Email.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(email);
});

// DELETE
router.delete("/emails/:id", async (req, res) => {
  await Email.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;
