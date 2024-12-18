
import React from 'react';
import styles from './Filter.module.css';

function Filter({ filter, setFilter }) {
  return (
    <input
      type="text"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search contacts"
      className={styles.input}
    />
  );
}

export default Filter;


