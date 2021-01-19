import styled from 'styled-components';


export const AddReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  @media screen and (max-width:750px){
    margin-top:20px;
  }
`;

export const AddReviewTitle = styled.h1`
  font-family: 'Nerko One', cursive;
  margin: 20px 0;

`;

export const AddReviewInput = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  background: transparent;
  border-bottom:1px solid black;
  font-size: 1.3rem;
  text-align: center;

`;
export const AddReviewLabel = styled.label`
  padding: 10px;

`;
export const AddReviewRatingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const SaveButton = styled.button`
  font-size: 1.3rem;
  outline: none;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.07);
  }
`;

