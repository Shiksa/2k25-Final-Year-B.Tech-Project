// ScanResult.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./scanResult.module.css";

const ScanResult = () => {
  const location = useLocation();
  const { filename, drugs, type } = location.state || {};
  const [compareData, setCompareData] = useState(null);
  const [selectedDrug, setSelectedDrug] = useState(drugs[0]);
  const [loading, setLoading] = useState(false);
  const [hasCompared, setHasCompared] = useState(false); // 🆕


  const handleCompare = async (medicineParam) => {  // 🆕
    const medicine = medicineParam || selectedDrug; // 🆕
    setLoading(true);
    setHasCompared(true); // 🆕
    try {
      const response = await fetch(`${import.meta.env.VITE_FLASK_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ name: medicine }),
      });

      if (!response.ok) throw new Error("Failed to fetch price data");

      const data = await response.json();
      setCompareData(data);
      setLoading(false);
    } catch (err) {
      console.error("Comparison Error:", err);
      setLoading(false);
    }
  };

  return (
    <div className={styles.scanReslutPage}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Scanned Prescription: {filename}</h2>
        {/* <p className={styles.subheading}>Detected Type: <b>{type}</b></p> */}

        <div className={styles.drugList}>
          <h3>Detected Medicines:</h3>
          <ul>
            {drugs.map((drug, idx) => (
              <li key={idx}>{drug}</li>
            ))}
          </ul>
          {!hasCompared && ( // 🆕
            <button className={styles.compareBtn} onClick={() => handleCompare(selectedDrug)}>
              Compare
            </button>
          )}


          {drugs.length > 1 && (
            <select
              className={styles.dropdown}
              value={selectedDrug}
              onChange={(e) => {
                const selected = e.target.value;
                setSelectedDrug(selected);
                handleCompare(selected);
              }}
            >
              {drugs.map((drug, idx) => (
                <option key={idx} value={drug}>{drug}</option>
              ))}
            </select>
          )}
        </div>

        {loading && <p className={styles.loading}>Comparing prices...</p>}

        {compareData && (
          <div className={styles.results}>
            <h3>Price Comparison for: {compareData.name}</h3>
            <p className={styles.desc}>{compareData.desc}</p>

            {compareData.sources
              .filter((item) => item.name && item.price) // 🆕 filter bad entries
              .map((item, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.cardLeft}>
                    <img
                      src={`${item.source}.png`}
                      alt={item.source}
                      className={styles.sourceImage}
                    />
                    <div className={styles.cardDetails}>
                      <div className={styles.medicineName}>{item.name}</div>
                      <div className={styles.price}>₹{item.price}</div>
                      <div className={styles.accuracy}>Accuracy: {item.accuracy.toFixed(2)}%</div>
                    </div>
                  </div>

                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <button className={styles.visitBtn}>Visit ↗</button>
                  </a>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanResult; 
