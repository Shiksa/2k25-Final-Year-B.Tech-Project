import React from 'react'
import styles from './HeroTabSection.module.css'
const imgSrc = `https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fsliders%2Fcontent-18.2_XqfApHK.png&w=1920&q=100`

const HeroTabSection = () => {
  return (
      <div className={styles.root}>
          <img
              src={imgSrc}
              className={styles.image}
              alt='img' />
    </div>
  )
}

export default HeroTabSection