import React from 'react';
import styles from './Card.module.css'

const Card = ({ text }) => {
  return (
    <div className={styles.root}>
      {text}
    </div>
  );
};

export default Card;
