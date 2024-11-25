import React from 'react'
import styles from './FeatureSection.module.css'
import Card from './components/Card'
import { Link } from 'react-router-dom'


const FeatureSection = () => {
  return (
    <div className={styles.root}>
      <div className={styles.cardSection}>
        <Card text={'Medicine Remainder'} color={'#f2f2f2'} />
        <Link to={`/specialization`}>
          <Card text={'Book Appointment'} color={'#9CDBA6'} />
        </Link>
        <Card text={'Upload Prescription'} color={'#f2f2f2'} />
      </div>
    </div>
  )
}

export default FeatureSection