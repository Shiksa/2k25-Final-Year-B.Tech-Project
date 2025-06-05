import React from 'react';
import styles from './TrackerForm.module.css';

const TrackerForm = ({ cycleData, setCycleData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCycleData({ ...cycleData, [name]: value });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Cycle Settings</h2>
      <form className={styles.form}>
        <label className={styles.label}>
          Start date of your last period:
          <input
            type="date"
            name="lastPeriodStart"
            value={cycleData.lastPeriodStart}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          How long did it last (days):
          <input
            type="number"
            name="periodLength"
            value={cycleData.periodLength}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Your usual cycle length (days):
          <input
            type="number"
            name="cycleLength"
            value={cycleData.cycleLength}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
      </form>
    </div>
  );
};

export default TrackerForm;
