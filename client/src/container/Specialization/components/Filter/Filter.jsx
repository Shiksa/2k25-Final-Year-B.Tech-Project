import React from 'react';
import styles from './Filter.module.css';

const Filter = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label>Sex:</label>
        <select
          value={filters.sex}
          onChange={(e) => handleFilterChange('sex', e.target.value)}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Fees:</label>
        <select
          value={filters.fees}
          onChange={(e) => handleFilterChange('fees', e.target.value)}
        >
          <option value="">All</option>
          <option value="300">300</option>
          <option value="300-500">300-500</option>
          <option value="500-1000">500-1000</option>
          <option value="1000+">1000+</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>City:</label>
        <select
          value={filters.city}
          onChange={(e) => handleFilterChange('city', e.target.value)}
        >
          <option value="">All</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Kolkata">Kolkata</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Days Available:</label>
        <select
          value={filters.days}
          onChange={(e) => handleFilterChange('days', e.target.value)}
        >
          <option value="">All</option>
          <option value="mon">Monday</option>
          <option value="tue">Tuesday</option>
          <option value="wed">Wednesday</option>
          <option value="thu">Thursday</option>
          <option value="fri">Friday</option>
          <option value="sat">Saturday</option>
          <option value="sun">Sunday</option>
          <option value="all day">All Day</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Experience:</label>
        <select
          value={filters.experience}
          onChange={(e) => handleFilterChange('experience', e.target.value)}
        >
          <option value="">All</option>
          <option value="below 10">Below 10</option>
          <option value="10-20">10-20</option>
          <option value="above 20">Above 20</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Mode of Appointment:</label>
        <select
          value={filters.modeOfAppointment}
          onChange={(e) => handleFilterChange('modeOfAppointment', e.target.value)}
        >
          <option value="">All</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
