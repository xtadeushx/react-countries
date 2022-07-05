import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Container as Container } from './Conteiner';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';

const HeaderEl = styled.header`
box-shadow: var(--shadow);
background-color: var(--colors-ua-base);
`;

const Wrapper = styled.div``;

const Title = styled.a.attrs({
  href: '/',
})``;



const ModeSwitcher = styled.div``;
const Header = () => {
  const [theme, setTheme] = useState('light');

const toggleTheme = ()=> setTheme(theme === 'light'? 'dark': 'light')

useEffect(() => {
document.body.setAttribute('data-theme', theme);

},[theme])


  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title>Where is the world</Title>
          <ModeSwitcher onClick={toggleTheme}>
            <IoMoon />
            Light Theme
          </ModeSwitcher>
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};

export default Header;
