import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get('https://6762c6cd17ec5852cae70ced.mockapi.io/contacts/');
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const response = await axios.post('https://6762c6cd17ec5852cae70ced.mockapi.io/contacts/', contact);
  return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  await axios.delete(`https://6762c6cd17ec5852cae70ced.mockapi.io/contacts/${id}`);
  return id;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export default contactsSlice.reducer;



