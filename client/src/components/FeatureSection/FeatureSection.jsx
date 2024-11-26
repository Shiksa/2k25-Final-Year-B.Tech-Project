import React from 'react'
import styles from './FeatureSection.module.css'
import Card from './components/Card'
import { Link } from 'react-router-dom'

const FeatureSection = () => {
  return (
    <div className={styles.root}>
      <div className={styles.cardSection}>
        <Card text={'Medicine Remainder'} color={'#9CDBA6'} />

        <Link to={'/specialization'}>
          <Card text={'Book Appointment'} color={'#9CDBA6'} />
        </Link>

        <Card text={'Upload Prescription'} color={'#9CDBA6'} />
      </div>
    </div>
  )
}

export default FeatureSection