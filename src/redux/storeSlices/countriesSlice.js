import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async (url, { rejectWithValue }) => {
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
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  countries: [],
  filteredCountryByRegion: [],
  region: '',
  searchValue: '',
  status: null,
  error: null,
  sortValue: { label: 'alphabet (A-Z)', value: 'alphabetUp' },
};

const collator = new Intl.Collator();

const countriesSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    handleSortFunc(state, action) {
      switch (action.payload.value) {
        case 'populationUp':
          state.filteredCountryByRegion = state.filteredCountryByRegion.sort(
            (a, b) => a.population - b.population,
          );
          break;
        case 'populationDown':
          state.filteredCountryByRegion = state.filteredCountryByRegion
            .sort((a, b) => a.population - b.population)
            .reverse();
          break;
        case 'areaUp':
          state.filteredCountryByRegion = state.filteredCountryByRegion.sort(
            (a, b) => a.area - b.area,
          );
          break;
        case 'areaDown':
          state.filteredCountryByRegion = state.filteredCountryByRegion
            .sort((a, b) => a.area - b.area)
            .reverse();
          break;
        case 'alphabetUp':
          state.filteredCountryByRegion = state.filteredCountryByRegion.sort((a, b) =>
            collator.compare(a.name, b.name),
          );
          break;
        case 'alphabetDown':
          state.filteredCountryByRegion = state.filteredCountryByRegion
            .sort((a, b) => collator.compare(a.name, b.name))
            .reverse();
          break;
        case 'capitalUp':
          state.filteredCountryByRegion = state.filteredCountryByRegion.sort((a, b) =>
            collator.compare(a.capital, b.capital),
          );
          break;
        case 'capitalDown':
          state.filteredCountryByRegion = state.filteredCountryByRegion
            .sort((a, b) => collator.compare(a.capital, b.capital))
            .reverse();
          break;

        default:
          return state.filteredCountryByRegion;
      }
    },
    onSetSortValue(state, action) {
      state.sortValue = action.payload;
    },
    handleFilterByRegion(state, action) {
      if (!action.payload) {
        state.filteredCountryByRegion = state.countries;
      }
      state.filteredCountryByRegion = state.countries.filter((item) =>
        item.region.includes(action.payload),
      );
    },
    onSetRegion(state, action) {
      state.region = action.payload;
    },

    onSetSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    handleSearch(state, action) {
      if (!action.payload) {
        state.filteredCountryByRegion = state.filteredCountryByRegion;
      }
      state.filteredCountryByRegion = state.filteredCountryByRegion.filter((item) =>
        item.name.toLowerCase().startsWith(action.payload.toLowerCase()),
      );
    },
  },
  extraReducers: {
    [fetchCountries.pending]: (state) => {
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

export const {
  handleSortFunc,
  handleFilterByRegion,
  handleSearch,
  onSetRegion,
  onSetSearchValue,
  onSetSortValue,
} = countriesSlice.actions;
