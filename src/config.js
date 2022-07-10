const BASE_URL = 'https://restcountries.com/v2/';

export const ALL_COUNTRIES = BASE_URL + 'all?fields=name,capital,flags,population,region,area';

export const searchByCountry = (name) => BASE_URL + 'name/' + name;

export const filterByCode = (codes) => BASE_URL + 'alpha?codes=' + codes.join(',');

 export const filterByRegion = (region) => `https://restcountries.com/v2/continent/${region}`;


export const options = [
    { label: 'population (A-Z)', value: 'populationUp' },
    { label: 'population (Z-A)', value: 'populationDown' },
    { label: 'alphabet (A-Z)', value: 'alphabetUp' },
    { label: 'alphabet (Z-A)', value: 'alphabetDown' },
    { label: 'capital (A-Z)', value: 'capitalUp' },
    { label: 'capital (Z-A)', value: 'capitalDown' },
    { label: 'area (A-Z)', value: 'areaUp' },
    { label: 'area (Z-A)', value: 'areaDown' },
  ];