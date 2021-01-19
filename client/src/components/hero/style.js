import styled from 'styled-components';

export const Circle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 125%;  
  background: #B7D1B4; 
  clip-path: circle(800px at right 100px);
  z-index:5;
  @media screen and (max-width: 868px) {
    display: none;
  }

`;
export const HeroSection = styled.section`
  position: relative;
`;
export const HeroContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px; 
  z-index:7;
  max-width: 1360px;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
export const HeroDescription = styled.div`
  display: flex;
  flex-direction:column;
  z-index: 7;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  max-width: 1260px;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
export const HeroTitle = styled.h1`
  padding-top:20px;
  font-size:60px;
  font-family: 'Nerko One', cursive;
`;
export const HeroDescriptionText = styled.p`
  font-size:40px;
  font-family: 'Nerko One', cursive;
`;
 