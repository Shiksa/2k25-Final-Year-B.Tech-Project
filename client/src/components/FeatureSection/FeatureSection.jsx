import React from 'react'
import styles from './FeatureSection.module.css'
import Card from './components/Card'

const FeatureSection = () => {
  return (
    <div className={styles.root}>
      <div className={styles.cardSection}>
        <Card text={'Medicine Remainder'} color={'#f2f2f2'} />
        <Card text={'Book Appointment'} color={'#f2f2f2'} />
        <Card text={'Upload Prescription'} color={'#f2f2f2'} />
      </div>
    </div>
  )
}

export default FeatureSection