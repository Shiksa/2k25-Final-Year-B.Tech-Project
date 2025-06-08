// routes/prescriptionRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Prescription = require("../models/Prescription");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Final route will be: POST /api/prescriptions/upload
router.post("/prescriptions/upload", upload.single("prescription"), async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    const newPrescription = new Prescription({
      fileName: originalname,
      contentType: mimetype,
      fileData: buffer,
      userEmail: req.body.userEmail,
      description: req.body.description,
    });
    await newPrescription.save();
    res.status(200).json({ message: "Uploaded" });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err });
  }
});

// Final route: GET /api/prescriptions/all
router.get("/prescriptions/all", async (req, res) => {
  const prescriptions = await Prescription.find({ userEmail: req.query.userEmail });
  res.json(prescriptions);
});

// Final route: GET /api/prescriptions/view/:id
router.get("/prescriptions/view/:id", async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);
  res.set("Content-Type", prescription.contentType);
  res.send(prescription.fileData);
});

// Final route: DELETE /api/prescriptions/delete/:id
router.delete("/prescriptions/delete/:id", async (req, res) => {
  await Prescription.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted" });
});

module.exports = router;
