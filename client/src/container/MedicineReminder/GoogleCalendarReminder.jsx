import React, { useState, useEffect } from 'react';
import styles from './GoogleCalendarReminder.module.css';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

function GoogleCalendarReminder() {
  const [medicineName, setMedicineName] = useState('');
  const [date, setDate] = useState('');
  const [doseCount, setDoseCount] = useState(1);
  const [doseTimes, setDoseTimes] = useState(['']);
  const [repeat, setRepeat] = useState('none');
  const [tokenClient, setTokenClient] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
          if (response.access_token) {
            setAccessToken(response.access_token);
          }
        },
      });
      setTokenClient(client);
    };
    document.body.appendChild(script);
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

  const createEvents = async (token) => {
    const recurrenceRules = {
      daily: 'RRULE:FREQ=DAILY',
      weekly: 'RRULE:FREQ=WEEKLY',
      monthly: 'RRULE:FREQ=MONTHLY',
    };

    for (let time of doseTimes) {
      const startDateTime = new Date(`${date}T${time}`);
      const endDateTime = new Date(startDateTime.getTime() + 15 * 60000);

      const event = {
        summary: `Take ${medicineName}`,
        start: { dateTime: startDateTime.toISOString(), timeZone: 'Asia/Kolkata' },
        end: { dateTime: endDateTime.toISOString(), timeZone: 'Asia/Kolkata' },
        reminders: {
          useDefault: false,
          overrides: [{ method: 'popup', minutes: 0 }],
        },
      };

      if (repeat !== 'none') {
        event.recurrence = [recurrenceRules[repeat]];
      }

      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || 'Failed to create event');
      }

      console.log('✅ Reminder created');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (accessToken) {
        // Already have token — use it directly
        await createEvents(accessToken);
        alert('✅ All medicine reminders created!');
      } else {
        // Request token — Google sign-in popup will appear
        tokenClient.callback = async (response) => {
          if (response.error) throw new Error(response.error);
          setAccessToken(response.access_token);
          await createEvents(response.access_token);
          alert('✅ All medicine reminders created!');
        };
        tokenClient.requestAccessToken({ prompt: 'consent' });
      }

      setMedicineName('');
      setDate('');
      setDoseCount(1);
      setDoseTimes(['']);
      setRepeat('none');
    } catch (err) {
      console.error('Error creating event:', err);
      alert('⚠️ Could not create the reminders.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Set Medicine Reminder</h1>
          <div className={styles.formRow}>
            <label className={styles.label}>
              Medicine Name:
              <input type="text" value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                required className={styles.input} />
            </label>
            <label className={styles.label}>
              Date:
              <input type="date" value={date}
                onChange={(e) => setDate(e.target.value)}
                required className={styles.input} />
            </label>
          </div>

          <label className={styles.label}>
            Number of Doses:
            <input type="number" min="1" value={doseCount}
              onChange={(e) => setDoseCount(parseInt(e.target.value))}
              required className={styles.input} />
          </label>

          {doseTimes.map((time, index) => (
            <label key={index} className={styles.label}>
              Dose {index + 1} Time:
              <input type="time" value={time}
                onChange={(e) => handleDoseTimeChange(index, e.target.value)}
                required className={styles.input} />
            </label>
          ))}

          <label className={styles.label}>
            Repeat:
            <select value={repeat} onChange={(e) => setRepeat(e.target.value)}
              className={styles.select}>
              <option value="none">No Repetition</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>

          <button type="submit" className={styles.button}>Set Reminder</button>
        </form>
      </div>
    </div>
  );
}

export default GoogleCalendarReminder;