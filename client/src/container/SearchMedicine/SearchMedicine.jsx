import React, { useState } from "react";
import styles from "./SearchMedicine.module.css";
import axios from "axios";
import bgImage from '../../../public/med-bg.png';



const SearchMedicine = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);


    try {
      const response = await axios.post(
        "http://localhost:8000/search",
        new URLSearchParams({ name: query.trim() }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setResult(response.data);
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchPage}>
      {/* 🌟 Top Banner
      <img src={bannerImage} alt="Healthcare Banner" className={styles.bannerImage} /> */}

      <h2 className={styles.heading}>Search Medicine</h2>
      <p className={styles.subheading}>
        Compare Medicine Prices From India's Top Pharmacies.
      </p>

      {/* 🔍 Search Box in Card */}
      <div className={styles.wrap}>
        <div className={styles.searchBoxCard} style={{ backgroundImage: `url(${bgImage})` }} >
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter medicine name"
            className={styles.input}
          />
          <button onClick={handleSearch} className={styles.searchBtn}>
            Search
          </button>
        </div>
      </div>

      {/* 🌀 Loader */}
      {loading && <div className={styles.loader}></div>}

      {/* ❌ Error */}
      {error && <p className={styles.error}>{error}</p>}

      {/* ✅ Results */}
      {result && (
        <div className={styles.results}>
          <h3>Results for: {result.name}</h3>
          <p className={styles.desc}>{result.desc}</p>

          {result.sources
            ?.filter((item) => item.name && item.price)
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
                    <div className={styles.accuracy}>
                      Accuracy: {item.accuracy.toFixed(2)}%
                    </div>
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
  );
};

export default SearchMedicine;
