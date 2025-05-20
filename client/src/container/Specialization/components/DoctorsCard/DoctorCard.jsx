import React, { useState, useEffect } from 'react';
import styles from './DoctorCard.module.css';
// import { doctorData } from './doctor.js';
import { useParams, useNavigate } from 'react-router-dom';
import ToggleButton from '../ToggleButton/ToggleButton.jsx';
import axios from 'axios';
import { useAuth } from '../../../../contexts/AuthContext.jsx';

const DoctorCard = () => {
  const [doctors, setDoctors] = useState([]);
  const { specialization } = useParams(); // Get specialization from URL params
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  // Filter doctors by specialization and search query
  const filteredDoctors = doctors.filter(
    (doctor) =>
      (!specialization || doctor.specialization.toLowerCase() === specialization.toLowerCase()) &&
      (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBookAppointment = async (doctor) => {
    if (!token) return alert('Please login first!');

    console.log('Access Token:', token);

    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const eventTitle = `Appointment with Dr. ${doctor.name}`;
    const location = doctor['map location'] || 'Online';
    const description = `Specialization: ${doctor.specialization}
    fees:${doctor.fees}`;


    const googleCalendarUrl = `${baseUrl}&text=${encodeURIComponent(eventTitle)}&location=${encodeURIComponent(
      location
    )}&details=${encodeURIComponent(description)}`;

    // Open the Google Calendar event creation page in a new tab
    window.open(googleCalendarUrl, '_blank');

    // Notify the doctor via email
    try {
      await axios.post('http://localhost:5000/api/sendEmail', {
        accessToken: token, // Pass the logged-in user's access token
        doctorEmail: doctor['email id'],
        eventTitle,
        description,
        location,
      });
      alert('The doctor has been notified via email.');
    } catch (error) {
      console.error('Error sending email notification:', error);
      alert('Failed to notify the doctor. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <ToggleButton />
      <div className={styles.heading}>
        <h1>
          {specialization
            ? `${specialization.charAt(0).toUpperCase() + specialization.slice(1)} All Around India`
            : 'Doctors All Around India'}
        </h1>
        <input
          type="text"
          placeholder="Search with Doctor's name or specialization"
          className={styles.searchBox}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>
      <div className={styles.info}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor['d-id']} className={styles.card}>
              <h2 className={styles.name}>{doctor.name}</h2>
              <div className={styles.imageContainer}>
                <img
                  src={doctor.image}
                  alt={`${doctor.name}'s profile`}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <p className={styles.details}><strong>Age:</strong> {doctor.age}</p>
              <p className={styles.details}><strong>Sex:</strong> {doctor.sex}</p>
              <p className={styles.details}><strong>Specialization:</strong> {doctor.specialization}</p>
              <p className={styles.details}><strong>Experience:</strong> {doctor.experience} years</p>
              <p className={styles.details}><strong>City:</strong> {doctor.city}</p>
              <p className={styles.details}><strong>Mode of Appointment:</strong> {doctor['mode of appointment']}</p>
              <p className={styles.details}><strong>Phone No:</strong> {doctor['ph no']}</p>
              <p className={styles.details}><strong>Email Id:</strong> {doctor['email id']}</p>
              <p className={styles.details}><strong>Days:</strong> {doctor['days available']}</p>
              <p className={styles.details}><strong>Timing:</strong> {doctor.timing}</p>
              <p className={styles.details}><strong>Fees:</strong> ₹{doctor.fees}</p>
              <button className={styles.bookButton} onClick={() => handleBookAppointment(doctor)}>Book Appointment</button>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No doctors found matching "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
