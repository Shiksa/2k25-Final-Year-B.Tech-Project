import React, { useState, useEffect } from "react";
import styles from "./OldPrescription.module.css";
import axios from "axios";
import { FaTrash, FaSearchPlus, FaTimes } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const OldPrescription = () => {
  const { user, isAuthenticated } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    if (!isAuthenticated && !user?.email) return;

    axios
      .get(`http://localhost:5000/api/prescriptions/all?userEmail=${user.email}`)
      .then((res) => setPrescriptions(res.data))
      .catch((err) => console.error("Error fetching prescriptions:", err));
  }, [user]);

  const deletePrescription = (id) => {
    if (!window.confirm("Are you sure you want to delete this prescription?")) return;

    axios
      .delete(`http://localhost:5000/api/prescriptions/delete/${id}`)
      .then(() => {
        setPrescriptions((prev) => prev.filter((p) => p._id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const scanPrescription = (id) => {
    alert(`Scanning prescription with ID: ${id}`);
    // Add your scan logic here
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
