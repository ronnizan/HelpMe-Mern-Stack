import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const ProfileCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1160px;
  margin: 40px auto;
`;
export const ProfilesTitle = styled.h1`
  font-family: 'Nerko One', cursive;
  font-size: 3.4rem;
`;

export const ProfileCardBox = styled.div`
  background: rgb(255, 255, 255, 0.6);
  display: flex;
  margin: 20px 0px;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);

  @media screen and (max-width: 450px) {
    margin: 20px 10px;
    width: 100%;
  }
`;
export const ProfileLink = styled(LinkR)`
  text-decoration: none;
  color: black;
  display: flex;
  font-family: 'Rubik', sans-serif;
  justify-content:space-between;
  align-items: center;
`;
export const ProfileCardContent = styled.div`
  display: flex;
  align-items: center;
`;
export const ProfileCardNameAndRating = styled.h2`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  @media screen and (max-width: 450px) {
    min-width: initial;
    font-size:1.2rem;
  }
`;

export const ReviewCardBoxImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileCardImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
  @media screen and (max-width: 450px) {
    width: 50px;
    height: 50px;
  }
`;
