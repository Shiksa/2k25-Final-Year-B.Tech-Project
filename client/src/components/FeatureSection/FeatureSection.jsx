import React from 'react'
import styles from './FeatureSection.module.css'
import Card from './components/Card'
import { Link } from 'react-router-dom'

const FeatureSection = () => {
  return (
    <div className={styles.root}>
      <div className={styles.cardSection}>
        <Link to={'/alert-for-medicine'} className={styles.cardText}>
          <Card text={'Medicine Reminder'} />
        </Link>

        <Link to={'/doctors'} className={styles.cardText}>
          <Card text={'Appointment Booking'} />
        </Link>

        <Link to={'/prescription-upload'} className={styles.cardText}>
          <Card text={'Upload Prescription'} />
        </Link>

      </div>
    </div>
  )
}

export default FeatureSection