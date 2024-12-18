import React from 'react';
import styles from './ContactList.module.css';

function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <li key={contact.id} className={styles.item}>
          {contact.name}: {contact.phone}
          <button onClick={() => deleteContact(contact.id)} className={styles.button}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;


