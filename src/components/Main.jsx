import React from 'react';
import styled from 'styled-components';
import { Container } from './Conteiner';
import Controls from './Controls';
import Search from './Search';

const Wrapper = styled.main`
padding: 2rem 0;

@media (min-width: 768px){
    padding: 4rem 0;

}
`;

const Main = ({children}) => {
  return (
    <>
      <Wrapper>
        <Container>
        {children}
        </Container>
      </Wrapper>
    </>
  );
};

export default Main;
