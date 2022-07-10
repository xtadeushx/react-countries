import styled from 'styled-components';
import { IoSearch } from "react-icons/io5";

import { useSelector, useDispatch } from 'react-redux';
import { onSetSearchValue } from '../redux/storeSlices/countriesSlice';


import React from 'react'

const InputContainer = styled.label`
background-color: var( --colors-ui-bas);
padding:1rem 2rem;
display:flex;
align-items: center;
border-radius:var(--radii);
box-shadow: var(--shadow);
width: 100%;
margin-bottom: 1.5rem;

@media (min-width: 768px) {
    margin-bottom: 0rem;
    width:280px;

}
`;

const Input = styled.input.attrs({
    type:'search',
    placeholder: 'Search for the country...',

})`
margin-left: 2rem;
border:none;
outline:none;
color: var( --colors-text );
background-color: var( --colors-ui-bas);
`;

const Search = ({searchValue}) => {
  const dispatch = useDispatch();
  const changeSearchValue = (e) => dispatch(onSetSearchValue(e.target.value));
  return (
    <InputContainer>
        <IoSearch/>
        <Input value={searchValue} onChange={changeSearchValue}/>
    </InputContainer>
  )
}

export default Search