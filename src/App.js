import { Route, Routes} from 'react-router-dom';
import React, { useState } from 'react';
// import axios from 'axios';

import {Header} from './components/Header';
import {Main} from './components/Main';
import { Details } from './pages/Details';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import {MyLoader} from './components/MyLoader';

function App() {
  const [isLoading, setIsLoading] = useState(false);
 

  return (
    <>
      <Header />
      <Main>
       
        <Routes>
          <Route path="/" element={<HomePage setIsLoading={setIsLoading} />} />
          <Route path="country/:name" element={<Details  />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {isLoading &&   <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap: '4rem'}}> {[...new Array (16)].map((_, index) => <MyLoader key={index} />) }</div>}
      </Main>
    </>
  );
}

export default App;
