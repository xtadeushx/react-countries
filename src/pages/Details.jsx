import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { searchByCountry } from '../config';
import { Info } from '../components/Info';
import { Button } from '../components/Button';

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate(name);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  const goBack = () => navigate(-1);
  return (
    <div>
      <Button onClick={() => goBack()}>
        <IoArrowBack /> Back
      </Button>
      {country && <Info {...country} />}
    </div>
  );
};

export { Details };
