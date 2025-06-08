import React, { useState } from "react";
import styles from "./PrescriptionUpload.module.css";
import { AiOutlineFileJpg } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // 👈 Added modal state
  const { user, isAuthenticated } = useAuth();

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
    e.preventDefault();

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
          setFile(null);
          setPreviewUrl(null);
          setDescription("");
          setShowModal(false); // 👈 Close modal on success
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleScan = () => {
    alert("Scan functionality to be implemented.");
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
                  onClick={handleOpenModal}
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
            <button onClick={handleUpload} className={styles.closeButton}>✕</button>
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
