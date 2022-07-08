import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List } from '../components/List';
import Controls from '../components/Controls';
import { Card } from '../components/Card';
import { ALL_COUNTRIES } from '../config';

const HomePage = ({ setIsLoading }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

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

  const handleSort = () => (sort) => {
    let data = [...filteredCountries];
    switch (sort) {
      case 'population-up':
        data = data.sort((a, b) => a.population - b.population);
        break;
      case 'population-down':
        data = data.sort((a, b) => b.population - a.population);
        break;
      case 'alphabet-down':
        data = data.sort((a, b) => b.name - a.name);
        break;
      case 'alphabet-up':
        data = data.sort((a, b) => a.name - b.name);
        break;

      default: data = data;
        break;
    }
    return data;
  };

  return (
    <>
      {' '}
      <Controls onSearch={handleSearch} />
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
