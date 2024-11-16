import React from 'react';
import styles from './Card.module.css'

const Card = ({ text, color }) => {
  return (
    <div className={styles.root} style={{ backgroundColor: color }}>
      {text}
    </div>
  );
};

export default Card;
