import React, { useState } from 'react';
import TrackerForm from './components/TrackerForm';
import Prediction from './components/Prediction';
import Calendar from './components/Calendar';
import styles from './PeriodTracker.module.css';

function PeriodTracker() {
  const [cycleData, setCycleData] = useState({
    lastPeriodStart: '',
    periodLength: 5, // Default period length
    cycleLength: 28, // Default cycle length
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>Menstrual Cycle Tracker</header>
      <section className={styles.section}>
        <TrackerForm cycleData={cycleData} setCycleData={setCycleData} />
      </section>
      <section className={styles.section}>
        <Prediction cycleData={cycleData} />
      </section>
      <section className={styles.section}>
        <Calendar cycleData={cycleData} />
      </section>
    </div>
  );
}

export default PeriodTracker;
