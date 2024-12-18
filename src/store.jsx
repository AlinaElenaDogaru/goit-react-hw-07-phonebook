// store.js
import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './features/contacts/contactsSlice';
import filterReducer from './features/filter/filterSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

export default store;

