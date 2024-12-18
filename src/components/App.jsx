import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from '../components/ContactForm/ContactForm.jsx';
import ContactList from '../components/ContactList/ContactList.jsx';
import Filter from '../components/Filter/Filter.jsx';
import { addContact, deleteContact } from '../features/contacts/contactsSlice.jsx';
import { setFilter } from '../features/filter/filterSlice.jsx';
import styles from '../components/ContactForm/ContactForm.module.css';

const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch(addContact(JSON.parse(storedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newContact) => {
    const duplicate = contacts.find(contact => contact.name === newContact.name);
    if (duplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter filter={filter} setFilter={(value) => dispatch(setFilter(value))} />
      <ContactList contacts={filteredContacts} deleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
