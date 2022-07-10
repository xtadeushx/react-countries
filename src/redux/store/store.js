import { configureStore } from '@reduxjs/toolkit';
import country from  '../storeSlices/contriesSlice'
export const store = configureStore({
  reducer: {
    country: country,
  },
});
