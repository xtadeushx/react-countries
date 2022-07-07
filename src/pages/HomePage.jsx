import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { List } from '../components/List';
import Controls from '../components/Controls';
import { Card } from '../components/Card';
// import { ALL_COUNTRIES } from '../config';

const HomePage = ({ countries }) => {
  const { name } = useParams();
  //   const [countries, setCountries] = useState([]);
  // const a = useParams();
  // console.log(a);
  //   useEffect(() => {
  //     axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  //   }, []);
  //   console.log(countries);
  return (
    <>
      {' '}
      <Controls />
      <List>
        {countries.map((country) => {
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
              <Card key={country.name} onClick={() => {}} {... countryInfo} />
            </Link>
          );
        })}
      </List>
    </>
  );
};

export { HomePage };
