import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import axios from 'axios';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Details } from './pages/Details';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MyLoader } from './components/MyLoader';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  // const [countries, setCountries] = useState([]);

  const { status, error } = useSelector((state) => state.country);

  return (
    <>
      <Header />
      <Main>
      
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="country/:name" element={<Details />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        
      </Main>
    </>
  );
}

export default App;
