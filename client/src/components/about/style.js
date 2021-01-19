import styled from 'styled-components';


export const AboutSection = styled.section`
  background-color: #f0f0f7;
  position: relative;
`;
export const AboutContainer = styled.div`
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
export const AboutImgContainer = styled.div`
  z-index: 6;
  flex: 40%;
  margin: 20px 10px;

  animation: ${({ scrollAbout }) =>
    scrollAbout === 1 ? 'slideInFromLeft 1s ease-in' : 'none'};
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
    flex: 60%;
    margin: 20px 40px;
  }
`;
export const AboutImg = styled.img`
  width: 100%;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
    width: 70%;
  }
`;

export const AboutDescription = styled.div`
  display: flex;
  flex: 50%;
  flex-direction: column;
  z-index: 6;
  margin: 0 auto;
  padding: 0 24px;
  animation: ${({ scrollAbout }) =>
    scrollAbout === 1 ? 'slideInFromRight 1s ease-in' : 'none'};

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
  }
`;

export const AboutTitle = styled.h1`
  font-size: 50px;
  font-family: 'Nerko One', cursive;
`;
export const AboutDescriptionText = styled.p`
  font-size: 30px;
  font-family: 'Nerko One', cursive;
`;
