import React, { useState, useEffect } from "react";
import styles from "./OldPrescription.module.css";
import axios from "axios";
import { FaTrash, FaSearchPlus, FaTimes } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const OldPrescription = () => {
  const { user, isAuthenticated } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !user?.email) return;

    axios
      .get(`http://localhost:5000/api/prescriptions/all?userEmail=${user.email}`)
      .then((res) => setPrescriptions(res.data))
      .catch((err) => console.error("Error fetching prescriptions:", err));
  }, [user]);

  const deletePrescription = (id) => {

    axios
      .delete(`http://localhost:5000/api/prescriptions/delete/${id}`)
      .then(() => {
        setPrescriptions((prev) => prev.filter((p) => p._id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const scanPrescription = async (id) => {
    try {
      // 1. Get image as blob from MongoDB
      const imageUrl = `http://localhost:5000/api/prescriptions/view/${id}`;
      const imageRes = await fetch(imageUrl);
      const imageBlob = await imageRes.blob();

      // 2. Create a temporary File object
      const file = new File([imageBlob], "temp_prescription.jpg", { type: imageBlob.type });

      // 3. Upload temporarily
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      const uploadRes = await axios.post("http://localhost:5000/api/temp-upload", uploadFormData);
      const { tempFileName } = uploadRes.data;

      // 4. Call /prescription on Flask with just filename in URL-encoded format
      const scanRes = await fetch("http://localhost:8000/prescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          filename: tempFileName, // same as uploaded name
        }),
      });

      if (!scanRes.ok) throw new Error("Scan failed");

      const result = await scanRes.json(); // read JSON result from Flask

      // 5. Navigate to ScanResult page
      navigate("/scan-result", {
        state: {
          filename: file.name,
          drugs: result.drugs,
          type: result.type,
        },
      });
    } catch (error) {
      console.error("Scan error:", error);
      alert("Scan failed.");
    }
  };



  const handleImageClick = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const closeModal = () => {
    setSelectedPrescription(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Prescriptions</h2>

      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Description</th>
              <th>Prescription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription._id}>
                <td>
                  {prescription.uploadedAt
                    ? new Date(prescription.uploadedAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "N/A"}
                </td>
                <td>{prescription.fileName}</td>
                <td>{prescription.description}</td>
                <td>
                  <img
                    src={`http://localhost:5000/api/prescriptions/view/${prescription._id}`}
                    alt={prescription.fileName}
                    className={styles.thumb}
                    onClick={() => handleImageClick(prescription)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => scanPrescription(prescription._id)}
                    className={`${styles.actionBtn} ${styles.scanBtn}`}
                  >
                    <FaSearchPlus />
                  </button>
                  <button
                    onClick={() => deletePrescription(prescription._id)}
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedPrescription && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={closeModal}>
              <FaTimes />
            </button>
            <img
              src={`http://localhost:5000/api/prescriptions/view/${selectedPrescription._id}`}
              alt="Prescription"
              className={styles.fullImage}
            />
            <button
              onClick={() => scanPrescription(selectedPrescription._id)}
              className={styles.scanLargeBtn}
            >
              Scan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OldPrescription;
