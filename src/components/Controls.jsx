import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';

import { onSetRegion } from '../redux/storeSlices/countriesSlice';

import { CustomSelect } from './CustomSelect';
import Search from './Search';
import { Sort } from './Sort';

const options = [
  { value: 'Africa', label: 'Africa' },
  { value: 'America', label: 'America' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Oceania', label: 'Oceania' },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Controls = ({ region, searchValue, onChangeSortValue }) => {
  const dispatch = useDispatch();
  const changedRegion = (e) => dispatch(onSetRegion(e.value));
  return (
    <>
      <Wrapper>
        <Search searchValue={searchValue} />
        <Sort onChangeSortValue={onChangeSortValue} />
        <CustomSelect
          options={options}
          placeholder="filter by region"
          isClearable
          isSearchable={false}
          value={region}
          onChange={changedRegion}
        />
      </Wrapper>
    </>
  );
};

export default Controls;
