import React, { useEffect, useMemo, useReducer, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { List } from '../components/List';
import Controls from '../components/Controls';
import { Card } from '../components/Card';
import { ALL_COUNTRIES } from '../config';
import {
  fetchCountries,
  handleSortFunc,
  handleFilterByRegion,
  handleSearch,
  onSetSortValue,
} from '../redux/storeSlices/countriesSlice';

import { MyLoader } from '../components/MyLoader';
import { ErrorMessage } from '../components/ErrorMessage';

const HomePage = () => {
  const dispatch = useDispatch();
  const { status, error, filteredCountryByRegion, region, searchValue, sortValue } = useSelector((state) => state.country);

console.log(sortValue.value);
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchCountries(ALL_COUNTRIES));
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(handleFilterByRegion(region));
    dispatch(handleSearch(searchValue)); 
    dispatch(handleSortFunc(sortValue));
  }, [region, searchValue, sortValue]);


  return (
    <>
      {' '}
      <Controls searchValue={searchValue} region={region} sortValue={sortValue}/>
      {status === 'loading' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: '4rem',
            paddingTop: '40px',
          }}>
          {' '}
          {[...new Array(16)].map((_, index) => (
            <MyLoader key={index} />
          ))}
        </div>
      ) : status === 'rejected' ? (
        <ErrorMessage text={error} />
      ) : (
        <List>
          {filteredCountryByRegion.map((country) => {
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
