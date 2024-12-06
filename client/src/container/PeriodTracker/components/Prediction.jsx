import React from 'react';
import styles from './Prediction.module.css';

const Prediction = ({ cycleData }) => {
  const { lastPeriodStart, periodLength, cycleLength } = cycleData;

  const calculateDates = () => {
    if (!lastPeriodStart || !periodLength || !cycleLength) return {};

    const start = new Date(lastPeriodStart);
    const nextPeriodStart = new Date(start);
    nextPeriodStart.setDate(start.getDate() + cycleLength);

    const lastPeriodEnd = new Date(start);
    lastPeriodEnd.setDate(start.getDate() + periodLength - 1);

    const ovulationDate = new Date(nextPeriodStart);
    ovulationDate.setDate(nextPeriodStart.getDate() - (cycleLength / 2));

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    const nextPeriodEnd = new Date(nextPeriodStart);
    nextPeriodEnd.setDate(nextPeriodStart.getDate() + periodLength - 1);

    return {
      nextPeriodStart: nextPeriodStart.toDateString(),
      lastPeriodEnd: lastPeriodEnd.toDateString(),
      nextPeriodEnd: nextPeriodEnd.toDateString(),
      ovulationDate: ovulationDate.toDateString(),
      fertileWindow: `${fertileStart.toDateString()} - ${fertileEnd.toDateString()}`,
    };
  };

  const dates = calculateDates();

  return (
    <div className={styles.predictionContainer}>
      <h2 className={styles.title}>Cycle Predictions</h2>
      {dates.nextPeriodStart ? (
        <ul className={styles.list}>
          <li><strong>Last Period End:</strong> {dates.lastPeriodEnd}</li>
          <li><strong>Next Period Start:</strong> {dates.nextPeriodStart}</li>
          <li><strong>Next Period End:</strong> {dates.nextPeriodEnd}</li>
          <li><strong>Ovulation Day:</strong> {dates.ovulationDate}</li>
          <li><strong>Fertile Window:</strong> {dates.fertileWindow}</li>
        </ul>
      ) : (
        <p className={styles.warning}>Please fill out the settings above.</p>
      )}
    </div>
  );
};

export default Prediction;
