import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async (url, { rejectedWithError }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Loading error');
      }
      const data = response.json();
      return data;
    } catch (error) {
      rejectedWithError('error');
    }
  },
);

const initialState = {
  countries: [],
  status: null,
  error: null,
};

const countriesSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCountries.padding]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCountries.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.countries = action.payload;
    },
    [fetchCountries.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default countriesSlice.reducer;
