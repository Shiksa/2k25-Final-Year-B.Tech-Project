import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import styles from './GoogleCalendarReminder.module.css';

const CLIENT_ID = '1960096376-0li91jpm8g10f47uua4eblfur70fcc82.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDCltvYaijNYKfHM7ZviFVNXvm63fONFjA';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

function GoogleCalendarReminder() {
  const [medicineName, setMedicineName] = useState('');
  const [date, setDate] = useState('');
  const [doseCount, setDoseCount] = useState(1);
  const [doseTimes, setDoseTimes] = useState(['']);
  const [repeat, setRepeat] = useState('none');

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  useEffect(() => {
    const newTimes = Array.from({ length: doseCount }, (_, i) => doseTimes[i] || '');
    setDoseTimes(newTimes);
  }, [doseCount]);

  const handleDoseTimeChange = (index, value) => {
    const updatedTimes = [...doseTimes];
    updatedTimes[index] = value;
    setDoseTimes(updatedTimes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await gapi.auth2.getAuthInstance().signIn();

      const recurrenceRules = {
        daily: 'RRULE:FREQ=DAILY',
        weekly: 'RRULE:FREQ=WEEKLY',
        monthly: 'RRULE:FREQ=MONTHLY',
      };

      for (let time of doseTimes) {
        const startDateTime = new Date(`${date}T${time}`);
        const endDateTime = new Date(startDateTime.getTime() + 15 * 60000); // 15 minutes

        const event = {
          summary: `Take ${medicineName}`,
          start: {
            dateTime: startDateTime.toISOString(),
            timeZone: 'Asia/Kolkata',
          },
          end: {
            dateTime: endDateTime.toISOString(),
            timeZone: 'Asia/Kolkata',
          },
          reminders: {
            useDefault: false,
            overrides: [{ method: 'popup', minutes: 0 }],
          },
        };

        if (repeat !== 'none') {
          event.recurrence = [recurrenceRules[repeat]];
        }

        await gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        }).execute((event) => {
          if (event.htmlLink) {
            console.log(`✅ Reminder created: ${event.htmlLink}`);
          }
        });
      }

      alert('✅ All medicine reminders created!');
    } catch (err) {
      console.error('Error creating event:', err);
      alert('⚠️ Could not create the reminders.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>Set Medicine Reminder</h2>
      <div className={styles.formRow}>
      <label className={styles.label}>
        Medicine Name:
        <input
          type="text"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          required
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className={styles.input}
        />
      </label>
      </div>

      <label className={styles.label}>
        Number of Doses:
        <input
          type="number"
          min="1"
          value={doseCount}
          onChange={(e) => setDoseCount(parseInt(e.target.value))}
          required
          className={styles.input}
        />
      </label>

      {doseTimes.map((time, index) => (
        <label key={index} className={styles.formRow}>
          Dose {index + 1} Time:
          <input
            type="time"
            value={time}
            onChange={(e) => handleDoseTimeChange(index, e.target.value)}
            required
            className={styles.input}
          />
        </label>
      ))}

      <label className={styles.label}>
        Repeat:
        <select
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          className={styles.select}
        >
          <option value="none">Does not repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>

      <button type="submit" className={styles.button}>
        Add to Google Calendar
      </button>
    </form>
  );
}

export default GoogleCalendarReminder;
