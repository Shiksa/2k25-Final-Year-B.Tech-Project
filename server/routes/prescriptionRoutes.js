// routes/prescriptionRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Prescription = require("../models/Prescription");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

// Setup multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ GLOBAL uploadsDir declared ONCE for all routes
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Final route will be: POST /api/prescriptions/upload
router.post("/prescriptions/upload", upload.single("prescription"), async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;

    // ✅ Save file to /server/uploads/<filename>

    const filePath = path.join(uploadsDir, originalname);
    fs.writeFileSync(filePath, buffer);

    // ✅ Save to MongoDB
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

// ✅ TEMP UPLOAD from frontend (to /uploads for Flask to use)
router.post("/temp-upload", upload.single("file"), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const filePath = path.join(uploadsDir, originalname);
    fs.writeFileSync(filePath, buffer);

    return res.status(200).json({ tempFileName: originalname });
  } catch (error) {
    console.error("Temp upload failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ TEMP DELETE after scan is done
router.post("/delete-temp", async (req, res) => {
  try {
    const { fileName } = req.body;
    const filePath = path.join(uploadsDir, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).json({ message: "Temp file deleted successfully" });
    } else {
      return res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Temp delete failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// New route: POST /api/prescriptions/scan/:id
router.post("/prescriptions/scan/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Send file to Flask
    const formData = new FormData();
    formData.append("image", prescription.fileData, {
      filename: prescription.fileName,
      contentType: prescription.contentType,
    });

    const flaskResponse = await axios.post(
      "http://localhost:8000/prescription",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    res.status(200).json(flaskResponse.data); // send scan result to frontend
  } catch (error) {
    console.error("Scan error:", error.message);
    res.status(500).json({ message: "Scan failed", error: error.message });
  }
});



module.exports = router;
