import React from 'react'
import { field } from './specializationField';
import { useNavigate } from "react-router-dom";
import styles from "./Specialization.module.css"

const Specialization = () => {
  const navigate = useNavigate();

  const handleBookAppointment = (specialization) => {
    navigate(`/specialization/${specialization}`); // Navigate to booking page
  };

  return (
    <div className={styles.specializationsContainer}>
      <h1>Doctor Specializations</h1>
      <input type="text" placeholder=" Search with Doctor's name " className={styles.searchBox} />
      <div className={styles.specializationsGrid}>
        {field.map((specialization) => (
          <div key={specialization.id} className={styles.specializationCard}>
            <h2>{specialization.name}</h2>
            <p>{specialization.description}</p>
            <button
              className={styles.bookAppointmentButton}
              onClick={() => handleBookAppointment(specialization.name)}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Specialization
