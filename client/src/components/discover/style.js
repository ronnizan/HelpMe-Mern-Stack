import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const DiscoverSection = styled.section`
  background-color: #f0f0f7;
  position: relative;
`;
export const DiscoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 50px auto;
  max-width: 1360px;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
export const DiscoverImgContainer = styled.div`
  z-index: 6;
  flex: 40%;
  margin: 20px 10px;
  animation: ${({ scrollDiscover }) =>
    scrollDiscover === 1 ? 'slideInFromRight 1s ease-in' : 'none'};

  @keyframes slideInFromRight {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(0);
    }
  }
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
    flex: 60%;
  }
`;
export const DiscoverImg = styled.img`
  width: 100%;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
    width: 70%;
  }
`;

export const DiscoverDescription = styled.div`
  display: flex;
  flex: 50%;
  flex-direction: column;
  z-index: 6;
  margin: 0 auto;
  padding: 0 24px;

  animation: ${({ scrollDiscover }) =>
    scrollDiscover === 1 ? 'slideInFromLeft 1s ease-in' : 'none'};
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(0);
    }
  }
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
    order: 1;
  }
`;

export const DiscoverTitle = styled.h1`
  font-size: 50px;
  font-family: 'Nerko One', cursive;
`;
export const DiscoverDescriptionText = styled.p`
  font-size: 30px;
  font-family: 'Nerko One', cursive;
`;
export const DiscoverDescriptionBtn = styled(LinkR)`
  font-size: 45px;
  font-family: 'Nerko One', cursive;
  text-decoration: none;
  display: flex;
  align-items: center;
  outline: none;
  width: 50%;
  color: #88d9de;
  transition: all 0.6s ease-in-out;
  &:hover {
    transform: scaleX(1.1) scaleY(1.5);
    border-bottom: 3px solid #f7d4c2;
  }
`;
