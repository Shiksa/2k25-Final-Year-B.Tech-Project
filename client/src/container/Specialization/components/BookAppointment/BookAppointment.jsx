import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BookAppointment.module.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const dayToIndex = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

const BookAppointment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const doctor = state?.doctor;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    mode: '',
    date: '',
    time: '',
    duration: '15',
    customDuration: '',
  });

  const [availableDates, setAvailableDates] = useState([]);
  const [showCustomDuration, setShowCustomDuration] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [timeSlot, setTimeSlot] = useState(''); // ✅ New: dynamic timeSlot

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    const days = doctor['days available'].split(',').map(day => day.trim().toLowerCase());
    const indexes = days.map(day => dayToIndex[day]);

    const today = new Date();
    const upcoming = [];

    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      if (indexes.includes(date.getDay())) {
        upcoming.push(new Date(date));
      }
    }
    setAvailableDates(upcoming);
  }, [doctor]);

  useEffect(() => {
    setShowCustomDuration(formData.duration === 'custom');
  }, [formData.duration]);

  useEffect(() => {
    const mode = doctor['mode of appointment'];
    setFormData(prev => ({ ...prev, mode }));
  }, [doctor]);

  // ✅ New: compute timeSlot dynamically
  useEffect(() => {
    if (!formData.time) return;

    const [hours, minutes] = formData.time.split(':').map(Number);
    const dur = formData.duration === 'custom'
      ? parseInt(formData.customDuration || '0', 10)
      : parseInt(formData.duration, 10);

    const startDT = new Date();
    startDT.setHours(hours, minutes);

    const endDT = new Date(startDT.getTime() + dur * 60000);

    const fmt = (d) => d.toTimeString().slice(0, 5); // HH:MM
    setTimeSlot(`${fmt(startDT)} - ${fmt(endDT)}`);
  }, [formData.time, formData.duration, formData.customDuration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalDuration = formData.duration === 'custom' ? formData.customDuration : formData.duration;

      const formattedDate = formData.date instanceof Date
        ? formData.date.toLocaleDateString('en-CA')  // ✅ gives "YYYY-MM-DD" in local timezone
        : formData.date;


      const res = await axios.post('http://localhost:5000/api/bookAppointment', {
        ...formData,
        date: formattedDate, // ✅ correct format
        duration: finalDuration,
        timeSlot,
        doctor,
      });

      alert('Appointment booked! Confirmation sent via email.');

      // Clear form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        description: '',
        mode: doctor['mode of appointment'] === 'hybrid' ? '' : doctor['mode of appointment'],
        date: '',
        time: '',
        duration: '15',
        customDuration: '',
      });

      setTimeSlot('');

    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Try again.');
    }
  };

  const [startTime, endTime] = doctor?.timing?.split('-').map(t => t.trim()) || [];

  const getMinMaxTime = () => {
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      if (!minutes) minutes = '00';
      if (modifier === 'PM' && hours !== '12') hours = parseInt(hours) + 12;
      if (modifier === 'AM' && hours === '12') hours = '00';
      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    };
    return {
      min: parseTime(startTime),
      max: parseTime(endTime),
    };
  };

  const isDayAvailable = (date) => {
    return availableDates.some(d => d.toDateString() === date.toDateString());
  };

  const { min, max } = getMinMaxTime();

  const getEmbeddedMapUrl = (url) => {
    try {
      const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        const lat = match[1];
        const lng = match[2];
        return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
      } else {
        console.warn('Could not extract coordinates from map URL:', url);
        return null;
      }
    } catch (e) {
      console.error('Map embed error:', e);
      return null;
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Book Appointment with Dr. {doctor?.name}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="name" value={formData.name} placeholder="Your Name" required onChange={handleChange} />
          <input name="email" value={formData.email} type="email" placeholder="Your Email" required onChange={handleChange} />
          <input
            name="phone"
            value={formData.phone}
            placeholder="Your Mobile Number"
            required
            onChange={handleChange}
            pattern="[6-9]{1}[0-9]{9}"
            title="Enter a valid 10-digit Indian mobile number starting with 6-9"
            maxLength="10"
          />
          <textarea name="description" value={formData.description} placeholder="Short description about your issue" onChange={handleChange} />

          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            required
          >
            <option value="">Select Mode</option>

            {(doctor['mode of appointment'] === 'hybrid' || doctor['mode of appointment'] === 'online') && (
              <option value="online">Online (Google Meet)</option>
            )}

            {(doctor['mode of appointment'] === 'hybrid' || doctor['mode of appointment'] === 'offline') && (
              <option value="offline">Offline (Clinic Visit)</option>
            )}
          </select>



          <label>Select Date:</label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData(prev => ({ ...prev, date }))}
            filterDate={isDayAvailable}
            minDate={new Date()}
            placeholderText="dd / mm / yyyy"
            dateFormat="dd/MM/yyyy"
            required
            className={styles.datePicker}
          />

          <div>
            <label>Select Time (Between {doctor?.timing}):</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              min={min}
              max={max}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Select Duration:</label>
            <select name="duration" value={formData.duration} onChange={handleChange}>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="custom">Custom</option>
            </select>

            {showCustomDuration && (
              <input
                type="number"
                name="customDuration"
                placeholder="Enter custom duration in minutes"
                value={formData.customDuration}
                onChange={handleChange}
                required
                min="1"
              />
            )}
          </div>

          {timeSlot && (
            <div>
              <strong>Calculated Time Slot:</strong> {timeSlot}
            </div>
          )}

          {doctor['mode of appointment'] !== 'online' &&
            formData.mode === 'offline' &&
            doctor['map location'] && (
              <div>
                <button type="button" className={styles.button} onClick={() => setShowMap(prev => !prev)}>
                  {showMap ? 'Hide Map' : 'Show Map'}
                </button>

                {showMap && (
                  getEmbeddedMapUrl(doctor['map location']) ? (
                    <iframe
                      src={getEmbeddedMapUrl(doctor['map location'])}
                      width="100%"
                      height="300"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Clinic Location"
                    ></iframe>
                  ) : (
                    <p style={{ color: 'red' }}>Unable to load map. Invalid location link.</p>
                  )
                )}
              </div>
            )}


          <button type="submit" className={styles.button}>Book Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
