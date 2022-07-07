import { Route,Routes,useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ALL_COUNTRIES } from './config';

import Header from './components/Header';
import Main from './components/Main';
import { Details } from './pages/Details';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const [countries, setCountries] = useState([]);
  const {name} = useParams();
  useEffect(() => {
    axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  }, []);
  return (
    <>
      <Header />
      <Main>
       <Routes>
        <Route path='/' element={<HomePage countries={countries}/>}/>
        <Route path='country/:name' element={<Details countries={countries}/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
       </Routes>
      </Main>
    </>

  );
}

export default App;
