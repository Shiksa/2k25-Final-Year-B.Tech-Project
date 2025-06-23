import React, { useState } from "react";
import styles from "./PrescriptionUpload.module.css";
import { AiOutlineFileJpg } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // 👈 Added modal state
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError("");
      setSuccessMessage("Image selected successfully.");
    } else {
      setFile(null);
      setPreviewUrl(null);
      setError("Please upload a valid JPG or PNG image.");
      setSuccessMessage("");
    }
  };

  const handleUpload = (e) => {
    if (e) e.preventDefault();

    if (!file || !description) {
      setError("Please select a file and enter description.");
      return;
    }

    if (!isAuthenticated || !user?.email) {
      setError("You must be logged in to upload prescriptions.");
      return;
    }

    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("userEmail", user.email);
    formData.append("description", description);

    fetch("http://localhost:5000/api/prescriptions/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Uploaded Successfully.");
          setError("");
          // setFile(null);
          // setPreviewUrl(null);
          setDescription("");
          // setShowModal(""); // 👈 Close modal on success
        } else {
          throw new Error("Upload failed.");
        }
      })
      .catch(() => {
        setError("Failed to upload image. Try again.");
        setSuccessMessage("");
      });
  };

  const handleOpenModal = () => {
    if (!file || !description) {
      setError("Please select a file and enter description.");
      return;
    }
    setShowModal(true);
  };

  const handleUploadAndOpenModal = async () => {
    try {
      await handleUpload();
      handleOpenModal();
    } catch (err) {
      console.error("Upload failed, not opening modal", err);
    }
  };


  const handleCloseModal = () => {
    setSuccessMessage("");
    setError("");
    setFile(null);
    setPreviewUrl(null);
    setDescription("");
    setShowModal(false);
  };

  const handleScan = async () => {
    try {

      // const toBase64 = (file) =>
      //   new Promise((resolve, reject) => {
      //     const reader = new FileReader();
      //     reader.readAsDataURL(file);
      //     reader.onload = () => resolve(reader.result.split(",")[1]); // Only base64 part
      //     reader.onerror = (error) => reject(error);
      //   });

      // const imageBase64 = await toBase64(file);

      const response = await fetch("http://localhost:8000/prescription", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // body: JSON.stringify({
        //   image: await toBase64(file),
        //   filename: file.name,
        // }),
        body: new URLSearchParams({
          filename: file.name,
        }),
      });

      if (!response.ok) throw new Error("Scan failed");

      const result = await response.json();

      // Now go to ScanResult.jsx with result data
      navigate("/scan-result", {
        state: {
          filename: file.name,
          drugs: result.drugs,
          type: result.type,
        },
      });
    } catch (error) {
      console.error("Error scanning prescription:", error);
      setError("Scan failed. Please try again.");
    }
  };


  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadCard}>
        <div className={styles.iconWrapper}>
          {previewUrl ? (
            <img src={previewUrl} alt="Prescription Preview" className={styles.previewImage} />
          ) : (
            <AiOutlineFileJpg size={40} />
          )}
        </div>

        <form className={styles.uploadForm}>
          {!file ? (
            <>
              <h2 className={styles.heading}>Upload Prescription</h2>
              <label className={styles.customFileLabel} htmlFor="fileInput">
                Choose JPG/PNG
              </label>
              <input
                type="file"
                id="fileInput"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </>
          ) : (
            <>
              <p className={styles.selectedFileName}>{file.name}</p>

              <div className={styles.descBox}>
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a short description"
                  rows={5}
                />
                <button
                  type="button"
                  className={styles.uploadButton}
                  disabled={!file}
                  onClick={handleUploadAndOpenModal}
                >
                  Upload
                </button>
              </div>
            </>
          )}

          {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
          {successMessage && (
            <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>
          )}
        </form>

        {!file && (
          <p className={styles.infoText}>
            Only JPG or PNG files are allowed. Ensure your prescription is clearly scanned.
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button onClick={handleCloseModal} className={styles.closeButton}>✕</button>
            {previewUrl && (
              <img src={previewUrl} alt="Preview" className={styles.modalImage} />
            )}
            <button onClick={handleScan} className={styles.scanButton}>Scan</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionUpload;
