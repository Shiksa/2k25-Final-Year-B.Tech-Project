import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ToggleButton.module.css';

const ToggleButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname.includes('doctors') ? 'left' : 'right');

  const handleToggle = (page) => {
    setActive(page === 'doctors' ? 'left' : 'right');
    navigate(`/${page}`);
  };

  return (
    <div className={styles.toggleContainer} data-active={active}>
      <button
        className={`${styles.toggleButton} ${active === 'left' ? styles.active : ''}`}
        onClick={() => handleToggle('doctors')}
      >
        All Doctors
      </button>
      <button
        className={`${styles.toggleButton} ${active === 'right' ? styles.active : ''}`}
        onClick={() => handleToggle('specialization')}
      >
        Specialization
      </button>
    </div>
  );
};

export default ToggleButton;
