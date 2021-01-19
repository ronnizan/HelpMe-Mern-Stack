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

export const PostCardBottomRow = styled.div`
  display: flex;
  margin: 15px 0;
  width: 100%;
  align-items: center;
  justify-content: center;
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

export const MarkAsCompletedBtn = styled.button`
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

export const ReadMoreBtn = styled(LinkR)`
  padding: 10px 25px;
  text-decoration: none;
  color: black;
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  outline: none !important;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;

  span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :hover {
    background-color: lightgrey;
  }
  :before,
  :after {
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    background: #000;
    transition: all 0.3s ease;
  }
  :before {
    height: 50%;
    width: 2px;
  }
  :after {
    width: 20%;
    height: 2px;
  }
  :hover:before {
    height: 100%;
  }
  :hover:after {
    width: 100%;
  }
  span:before,
  span:after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    background: #000;
    transition: all 0.3s ease;
  }
  span:before {
    width: 2px;
    height: 50%;
  }
  span:after {
    width: 20%;
    height: 2px;
  }
  span:hover:before {
    height: 100%;
  }
  span:hover:after {
    width: 100%;
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
