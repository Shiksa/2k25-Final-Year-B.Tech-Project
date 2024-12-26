import React, { useState } from 'react';
import styles from './DoctorCard.module.css';
import { doctorData } from './doctor.js';
import { useParams, useNavigate } from 'react-router-dom';
import ToggleButton from '../ToggleButton/ToggleButton.jsx';

const DoctorCard = () => {
  const { specialization } = useParams(); // Get specialization from URL params
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter doctors by specialization and search query
  const filteredDoctors = doctorData.filter(
    (doctor) =>
      (!specialization || doctor.specialization.toLowerCase() === specialization.toLowerCase()) &&
      (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              <button className={styles.bookButton}>Book Appointment</button>
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
