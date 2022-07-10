import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

const Controls = ({ onChangeSortValue,onChangeSortRegion,region,setRegion }) => {
  // const [search, setSearch] = useState('');
console.log(region);
  // useEffect(() => {
  //   const currentRegion = region?.value || ''
  //   onChangeSortRegion(currentRegion);
  //   //eslint-disable-next-line
  // }, [region]);
  return (
    <>
      <Wrapper>
        <Search />
        <Sort onChangeSortValue={onChangeSortValue}/>
        <CustomSelect
          options={options}
          placeholder="filter by region"
          isClearable
          isSearchable={false}
          value={region}
          onChange={(e)=>{
            setRegion(e.value);
            //onChangeSortRegion(region);
          }}
        />
      </Wrapper>
    </>
  );
};

export default Controls;
