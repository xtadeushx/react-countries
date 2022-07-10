import { configureStore } from '@reduxjs/toolkit';
import country from  '../storeSlices/countriesSlice'
export const store = configureStore({
  reducer: {
    country: country,
  },
});
