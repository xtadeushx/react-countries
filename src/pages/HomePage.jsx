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
  const [sortValues, setSortValues] = useState('');

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

  function handleSort(sort){
    console.log(sort);
    let data=[...filteredCountries];
    if (sort === 'populationUp') {
      data = data.sort((a, b) => a.population - b.population);
    }
    if (sort === 'populationDown') {
      data = data.sort((a, b) => b.population - a.population);
    }
    if (sort === 'alphabetDown') {
      data = data.sort((a, b) => b.name - a.name);
    }
    if (sort === 'alphabetUp') {
      data = data.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase());
    }
    if (sort === '') {
      return data;
    }
    console.log(data);
    // setFilteredCountries(data);
    setFilteredCountries(data);
  };

  const onChangeSortValue = (data) => setSortValues(data);

  useEffect(() => {
    console.log('object');
    handleSort(sortValues);
    //console.log(sortValues);
  }, [sortValues]);


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
