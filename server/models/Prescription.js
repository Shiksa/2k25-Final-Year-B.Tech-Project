// models/Prescription.js
const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  fileName: String,
  fileData: Buffer,
  contentType: String,
  description: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  userEmail: String, // Auth0 user email (if needed)
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
