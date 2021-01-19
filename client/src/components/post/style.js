import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';


export const PostsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const PostCard = styled.div`
  display: flex;
  flex-basis: 35%;
  background: ${({ isDatePassed, isCompleted }) =>
    isDatePassed
      ? 'rgb(255,0,0,0.16)'
      : isCompleted
      ? 'rgb(144,238,144,0.36)'
      : 'white'};
  margin: 20px 20px;
  flex-direction: column;
  padding: 20px;
  font-family: 'Rubik', sans-serif;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  @media screen and (max-width: 850px) {
    flex-basis: 100%;
  }
`;
export const PostCardTopRow = styled.div`
  display: flex;
  width:100%;
  align-items: space-between;
  justify-content: space-between;
`;

export const PostCardRow = styled.div`
  display: flex;
  margin: 15px 0;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const PostCarUserAcceptedRow = styled.div`
  display: flex;
  margin: 15px 0;
  width: 100%;
  align-items: center;
`;
export const PostCardDescription = styled.div`
  font-size: 1.4rem;
  font-family: 'Rubik', sans-serif;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;
export const PostCardImageAndName = styled(LinkR)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  :hover {
    transform: scale(1.03);
  }
`;
export const PostCardProfileImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
  @media screen and (max-width: 750px) {
    width: 50px;
    height: 50px;
  }
`;
export const PostCardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
`;
export const PostCardName = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-family: 'Rubik', sans-serif;

  @media screen and (max-width: 750px) {
    font-size: 0.9rem;
  }
`;

export const PostCardBoxDate = styled.h1`
  font-size: 15px;
  color: grey;
  text-align: right;
  font-family: cursive;
`;

export const PostCardTitle = styled.h1`
  display: flex;
  margin: 20px auto;
  text-align: center;
  align-items: center;
  font-size: 2rem;
  font-family: 'Indie Flower', cursive;

  @media screen and (max-width: 750px) {
  }
`;

export const PostGoogleMap = styled.iframe`
  border: none;
  outline: none;
  width: 100%;
  height: 300px;
  cursor: pointer;
`;
export const WazeLink = styled.a`
  border: none;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 2.5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export const AcceptBtn = styled.button`
  padding: 10px 25px;
  cursor: pointer;
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  background: transparent;
  &:hover {
    background-color: lightgreen;
  }
`;

export const PostCardVMark = styled(FaCheckCircle)`
  font-size: 3.5rem;
  margin-right: 10px;
`;
export const PostCardXMark = styled(AiFillCloseCircle)`
  font-size: 3.5rem;
  cursor: pointer;
`;
