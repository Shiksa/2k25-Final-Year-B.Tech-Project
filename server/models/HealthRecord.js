const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, // from Auth0
  bloodGroup: String,
  bloodPressure: String,
  bodyTemperature: Number,
  heartRate: Number,
  cholesterolLevel: Number,
  height: String,
  weight: Number,
  bloodSugar: Number,
  oxygenSaturation: Number,
  notes: String,
  diagnosis: String,
  date: String,
}, { timestamps: true });

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
