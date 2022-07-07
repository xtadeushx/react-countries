import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Container } from './Conteiner';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';

const HeaderEl = styled.header`
  box-shadow: var(--shadow);
  background-color: var(--colors-ua-base);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0px;
`;

const Title = styled.a.attrs({
  href: '/',
})`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  text-decoration: none;
  font-weight: var(--fw-bold);
`;

const ModeSwitcher = styled.div`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  cursor: pointer;
  // font-weight: var(--fw-bold);
  text-transform: capitalize;
`;
const Header = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title>Where is the world</Title>
          <ModeSwitcher onClick={toggleTheme}>
            {theme === 'dark' ? <IoMoon size="14px" /> : <IoMoonOutline size="14px" />}{' '}
            <span style={{ marginLeft: '0.75rem' }}>
              {theme} Theme
            </span>
          </ModeSwitcher>
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};

export  {Header};
