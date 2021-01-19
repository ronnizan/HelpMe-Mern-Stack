import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';


export const ReviewCardBox = styled.div`
  background: rgb(255, 255, 255, 0.6);
  padding:15px;
  margin: 20px 20px;
  width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  font-family: 'Rubik', sans-serif;

  @media screen and (max-width: 450px) {
    margin-left: -10px;
  }
`;
export const ReviewCardBoxTopLine = styled.div`
  display: flex;

`;
export const ReviewCardBoxImageAndName = styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  padding: 10px;
  font-family: 'Rubik', sans-serif;

`;
export const ReviewCardBoxDate = styled.h1`
  font-size: 15px;
  color: grey;
  font-family: cursive;

`;

export const ReviewCardBoxComment = styled.p`
  font-weight: bold;
  width:80%;
  margin:0 auto;
  

`;
export const ReviewCardBoxTitle = styled.h2`
  padding: 10px;
  font-family: cursive;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`;
export const ReviewsTitle = styled.h1`
  font-family: 'Nerko One', cursive;
  margin: 20px auto;
  width: 100%;
  text-align: center;
`;
export const ReviewCardBoxImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  object-fit: cover;
`;
