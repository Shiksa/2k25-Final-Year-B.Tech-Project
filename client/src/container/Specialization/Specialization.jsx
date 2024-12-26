import React, { useState } from 'react';
import { field } from './specializationField'; // List of specializations
import { useNavigate } from 'react-router-dom';
import styles from './Specialization.module.css';
import ToggleButton from './components/ToggleButton/ToggleButton';

const Specialization = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search query
  const navigate = useNavigate();

  // Filter specializations based on the search query
  const filteredSpecializations = field.filter((specialization) => {
    const query = searchQuery.toLowerCase();
    const name = specialization.name.toLowerCase();
    const description = specialization.description.toLowerCase();

    // Check if the name or description starts with the query or contains the query
    return name.startsWith(query) || description.includes(query);
  });

  const handleBookAppointment = (specialization) => {
    navigate(`/specialization/${specialization}`); // Navigate to doctors filtered by specialization
  };

  return (
    <div className={styles.specializationsContainer}>
      <ToggleButton />
      <h1>Doctor Specializations</h1>
      <input
        type="text"
        placeholder="Search for specialization"
        className={styles.searchBox}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
      />
      <div className={styles.specializationsGrid}>
        {filteredSpecializations.length > 0 ? (
          filteredSpecializations.map((specialization) => (
            <div key={specialization.id} className={styles.specializationCard}>
              <h2>{specialization.name}</h2>
              <p>{specialization.description}</p>
              <button
                className={styles.bookAppointmentButton}
                onClick={() => handleBookAppointment(specialization.name)}>
                Look for {specialization.name}
              </button>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No specializations found for "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
};

export default Specialization;
