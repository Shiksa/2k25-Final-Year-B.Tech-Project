import React, { useState } from "react";
import styles from "./PrescriptionUpload.module.css";
import { AiOutlineFileJpg } from "react-icons/ai";

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
      setSuccessMessage("File selected successfully.");
    } else {
      setFile(null);
      setError("Please upload a valid PDF file.");
      setSuccessMessage("");
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      setError("No file selected. Please upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("prescription", file);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("File uploaded successfully.");
          setError("");
        } else {
          throw new Error("File upload failed.");
        }
      })
      .catch(() => {
        setError("Failed to upload file. Try again.");
        setSuccessMessage("");
      });
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadCard}>
        <div className={styles.iconWrapper}>
          <AiOutlineFileJpg size={40} />
        </div>
        <h2>Upload Prescription</h2>
        <form className={styles.uploadForm} onSubmit={handleUpload}>
          <label className={styles.customFileLabel} htmlFor="fileInput">
            Choose JPG
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".jpg"
            onChange={handleFileChange}
          />
          <button type="submit" className={styles.uploadButton} disabled={!file}>
            Upload
          </button>
          {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
          {successMessage && (
            <p className={`${styles.message} ${styles.success}`}>
              {successMessage}
            </p>
          )}
        </form>
        <p className={styles.infoText}>
          Only PDF files are allowed. Ensure your prescription is clearly scanned.
        </p>
      </div>
    </div>
  );
};

export default PrescriptionUpload;
