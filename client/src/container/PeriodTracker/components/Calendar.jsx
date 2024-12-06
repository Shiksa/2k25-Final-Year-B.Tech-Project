import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Calendar.module.css';

const CustomCalendar = ({ cycleData }) => {
  const { lastPeriodStart, periodLength, cycleLength } = cycleData;

  const highlightDates = () => {
    if (!lastPeriodStart || !periodLength || !cycleLength) return [];
    const start = new Date(lastPeriodStart);
    const dates = [];

    for (let i = 0; i < 3; i++) {
      const periodStart = new Date(start);
      periodStart.setDate(start.getDate() + i * cycleLength);

      const periodEnd = new Date(periodStart);
      periodEnd.setDate(periodStart.getDate() + periodLength - 1);

      const ovulation = new Date(periodStart);
      ovulation.setDate(periodStart.getDate() - (cycleLength / 2));

      const fertileStart = new Date(ovulation);
      fertileStart.setDate(ovulation.getDate() - 5);

      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(ovulation.getDate() + 1);

      dates.push({ date: periodStart, type: 'periodStart' });
      dates.push({ date: periodEnd, type: 'periodEnd' });
      dates.push({ date: ovulation, type: 'ovulation' });
      dates.push({ date: fertileStart, type: 'fertileStart' });
      dates.push({ date: fertileEnd, type: 'fertileEnd' });
    }

    return dates;
  };

  const tileClassName = ({ date }) => {
    const highlighted = highlightDates();
    const found = highlighted.find((d) => d.date.toDateString() === date.toDateString());

    if (found) {
      switch (found.type) {
        case 'periodStart':
        case 'periodEnd':
          return styles.periodDay;
        case 'ovulation':
          return styles.ovulationDay;
        case 'fertileStart':
        case 'fertileEnd':
          return styles.fertileDay;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div className={styles.calendarContainer}>
      <h2>Menstrual Calendar</h2>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default CustomCalendar;
