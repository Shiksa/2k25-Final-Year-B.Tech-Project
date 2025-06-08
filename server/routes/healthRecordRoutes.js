const express = require("express");
const router = express.Router();
const HealthRecord = require("../models/HealthRecord");

// GET records for a user
router.get("/:email", async (req, res) => {
  try {
    const records = await HealthRecord.find({ userEmail: req.params.email });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new record
router.post("/", async (req, res) => {
  try {
    const record = new HealthRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE record by ID
router.delete("/:id", async (req, res) => {
  try {
    await HealthRecord.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
