import styled from "styled-components";


export const ServicesContainer = styled.div`
  max-width:1160px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

export const ServicesWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 3fr ;
    padding: 0 20px;
  }
`;

export const ServicesCard = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  max-height: 340px;
  padding: 30px;
  margin-right:10px;
  margin-bottom:10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  @keyframes slideInFromBottom {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateX(0);
  }
}
`;

export const ServicesIcon = styled.img`
  height: 160px;
  width: 160px;
  margin-bottom: 10px;
`;
export const ServicesH1 = styled.h1`
  font-size: 3.5rem;
  font-family: 'Nerko One', cursive;
  margin-bottom: 64px;
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const ServicesH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  
`;
export const ServicesP = styled.p`
  font-size: 1rem;
  text-align: center;
`;
