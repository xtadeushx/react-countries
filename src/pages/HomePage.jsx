import React, { useEffect, useMemo, useReducer, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List } from '../components/List';
import Controls from '../components/Controls';
import { Card } from '../components/Card';
import { ALL_COUNTRIES } from '../config';

let colorator = new Intl.Collator();

const HomePage = ({ setIsLoading }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [sortValues, setSortValues] = useState('alphabetUp');

  useEffect(() => {
    setIsLoading((prev) => !prev);
    getFetchCountries();
    setIsLoading((prev) => !prev);
  }, []);

  const getFetchCountries = () => {
    try {
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSearch = useMemo(
    () => (search, region) => {
      let data = [...countries];
      if (region) {
        data = data.filter((item) => item.region.includes(region));
      }
      if (search) {
        data = data.filter((item) => item.name.toLowerCase().startsWith(search.toLowerCase()));
      }
      setFilteredCountries(data);
    },
    [countries],
  );

  useEffect(() => {
    handleSearch();
  }, [countries]);

  useEffect(() => {
    handleSortFunc(sortValues);
  }, [sortValues]);


  function handleSortFunc(sort) {
    let data = JSON.parse(JSON.stringify(filteredCountries));

    switch (sort) {
      case 'populationUp':
        data.sort((a, b) => a.population - b.population);
        break;
      case 'populationDown':
        data.sort((a, b) => a.population - b.population).reverse();
        break;
      case 'alphabetDown':
        data.sort((a, b) => colorator.compare(b.name, a.name));
        break;
      case 'alphabetUp':
        data.sort((a, b) => colorator.compare(a.name, b.name));
        break;
      case 'alphabetDown':
        data.sort((a, b) => colorator.compare(a.name, b.name)).reverse();
        break;
      case 'capitalUp':
        data.sort((a, b) => colorator.compare(a.capital, b.capital));
        break;
      case 'capitalDown':
        data.sort((a, b) => colorator.compare(a.capital, b.capital)).reverse();
        break;

      default:
      return  data;
    }
    setFilteredCountries(data);
  };

  const onChangeSortValue = (data) => setSortValues(data);

  return (
    <>
      {' '}
      <Controls onSearch={handleSearch} onChangeSortValue={onChangeSortValue} />
      <List>
        {filteredCountries.map((country) => {
          const countryInfo = {
            img: country.flags.png,
            name: country.name,
            info: [
              {
                title: 'Population',
                description: country.population.toLocaleString(),
              },
              {
                title: 'Region',
                description: country.region,
              },
              {
                title: 'Capital',
                description: country.capital,
              },
            ],
          };
          return (
            <Link key={country.name} to={`/country/${country.name.toLowerCase()}`}>
              <Card key={country.name} {...countryInfo} />
            </Link>
          );
        })}
      </List>
    </>
  );
};

export { HomePage };
