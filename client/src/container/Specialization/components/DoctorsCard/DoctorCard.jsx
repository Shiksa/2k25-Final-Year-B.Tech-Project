import React from "react";
import styles from "./DoctorCard.module.css";
import { doctor } from "./doctor.js";
import { useParams } from "react-router-dom";

const DoctorCard = () => {
  const { id } = useParams();
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* <img
          src={image || "https://via.placeholder.com/150"} 
          alt={`${doctor.name}'s profile`}
          className={styles.image}
        /> */}
      </div>
      <div className={styles.info}>
        {/* <div className={}></div> */}
        <h2 className={styles.name}>{doctor.name}</h2>
        <p className={styles.details}><strong>Age:</strong> {doctor.age}</p>
        <p className={styles.details}><strong>Experience:</strong> {doctor.experience} years</p>
        <p className={styles.details}><strong>Sex:</strong> {doctor.sex}</p>
        <p className={styles.details}><strong>Fees:</strong> ₹{doctor.fees}</p>
        <p className={styles.details}><strong>Mode of Appointment:</strong> {doctor.modeOfAppointment}</p>
        <p className={styles.details}><strong>Timing:</strong> {doctor.timing}</p>
        <p className={styles.details}><strong>Specialization:</strong> {doctor.specialization}</p>
        <button className={styles.bookButton}>Book Appointment</button>
      </div>
    </div>
  );
};

export default DoctorCard;
