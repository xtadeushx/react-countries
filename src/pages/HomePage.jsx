import React, { useEffect, useMemo, useReducer, useState } from 'react';
// import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from '../components/List';
import Controls from '../components/Controls';
import { Card } from '../components/Card';
import { ALL_COUNTRIES } from '../config';
import { fetchCountries } from '../redux/storeSlices/contriesSlice';
import { MyLoader } from '../components/MyLoader';
import { ErrorMessage } from '../components/ErrorMessage';

let collator = new Intl.Collator();

const HomePage = ({ setIsLoading }) => {
  // const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
  const { countries, status, error } = useSelector((state) => state.country);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [sortValues, setSortValues] = useState('alphabetUp');

  console.log(status, error);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchCountries(ALL_COUNTRIES));
    }, 2000);
  }, []);

  // const getFetchCountries = () => {
  //   try {
  //     axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

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
      case 'areaUp':
        data.sort((a, b) => a.area - b.area);
        break;
      case 'areaDown':
        data.sort((a, b) => a.area - b.area).reverse();
        break;
      case 'alphabetUp':
        data.sort((a, b) => collator.compare(a.name, b.name));
        break;
      case 'alphabetDown':
        data.sort((a, b) => collator.compare(a.name, b.name)).reverse();
        break;
      case 'capitalUp':
        data.sort((a, b) => collator.compare(a.capital, b.capital));
        break;
      case 'capitalDown':
        data.sort((a, b) => collator.compare(a.capital, b.capital)).reverse();
        break;

      default:
        return data;
    }
    setFilteredCountries(data);
  }

  const onChangeSortValue = (data) => setSortValues(data);
  return (
    <>
      {' '}
      <Controls onSearch={handleSearch} onChangeSortValue={onChangeSortValue} />
      {status === 'loading' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '4rem' }}>
          {' '}
          {[...new Array(16)].map((_, index) => (
            <MyLoader key={index} />
          ))}
        </div>
      ) : status === 'rejected' ? (
        <ErrorMessage text="server error" />
      ) : (
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
                {
                  title: 'Area',
                  description: country.area + ' ' + 'km',
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
      )}
    </>
  );
};

export { HomePage };
