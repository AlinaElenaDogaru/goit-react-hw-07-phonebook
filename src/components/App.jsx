import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from '../components/ContactForm/ContactForm.jsx';
import ContactList from '../components/ContactList/ContactList.jsx';
import Filter from '../components/Filter/Filter.jsx';
import { fetchContacts, addContact, deleteContact } from '../features/contacts/contactsSlice.jsx';
import { setFilter } from '../features/filter/filterSlice.jsx';
import styles from '../components/ContactForm/ContactForm.module.css';

const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList contacts={filteredContacts} deleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;

