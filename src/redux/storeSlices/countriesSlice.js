import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async (url, {rejectWithValue}) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          'Server: ' + response.statusText + ' response with status :' + response.status,
        );
      }
      const data = response.json();
      return data;
    } catch (error) {
     return   rejectWithValue(error.message);
    }
  },
);

const initialState = {
  countries: [],
  filteredCountryByRegion:[],
  status: null,
  error: null,
};

const collator = new Intl.Collator();

const countriesSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
     handleSortFunc(state, action) {    
        switch (action.payload) {
          case 'populationUp':
            state.filteredCountryByRegion.sort((a, b) => a.population - b.population);
            break;
          case 'populationDown':
            state.filteredCountryByRegion.sort((a, b) => a.population - b.population).reverse();
            break;
          case 'areaUp':
            state.filteredCountryByRegion.sort((a, b) => a.area - b.area);
            break;
          case 'areaDown':
            state.filteredCountryByRegion.sort((a, b) => a.area - b.area).reverse();
            break;
          case 'alphabetUp':
            state.filteredCountryByRegion.sort((a, b) => collator.compare(a.name, b.name));
            break;
          case 'alphabetDown':
            state.filteredCountryByRegion.sort((a, b) => collator.compare(a.name, b.name)).reverse();
            break;
          case 'capitalUp':
            state.filteredCountryByRegion.sort((a, b) => collator.compare(a.capital, b.capital));
            break;
          case 'capitalDown':
            state.filteredCountryByRegion.sort((a, b) => collator.compare(a.capital, b.capital)).reverse();
            break;
    
          default:
            return  state.filteredCountryByRegion;
        }
       // setFilteredCountries(data);
      },
      handleFilterByRegion(state, action){
        if(!action.payload){
          state.filteredCountryByRegion = state.countries;
        }
       state.filteredCountryByRegion = state.countries.filter((item) => item.region.includes(action.payload));
      },
      handleSearch(state, action){
        [...state.countries].filter((item) => item.name.toLowerCase().startsWith(action.payload.toLowerCase()));
      },
  },
  extraReducers: {
    [fetchCountries.pending]: (state, action) => {
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

export const {handleSortFunc,handleFilterByRegion,handleSearch} = countriesSlice.actions;