const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Get all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

module.exports = router;
