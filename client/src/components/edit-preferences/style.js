import styled from 'styled-components';

export const ProfileMainTitle = styled.h1`
  font-family: 'Nerko One', cursive;
  margin: 30px 0;
`;

export const ProfileMainPhoneInputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const ProfileMainInputLabel = styled.label`
  padding: 10px;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  font-size: 1.3rem;
`;
export const ProfileMainInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.3rem;
  border-bottom: 1px solid #88d9de;
  cursor: ${({ phoneNumber }) => (phoneNumber ? '' : 'pointer')};
`;
export const ProfileMainSelectInput = styled.select`
  margin-bottom: 20px;
  border: none;
  outline: none;
  font-family: 'Rubik', sans-serif;
  background: transparent;
  font-size: 1.1rem;
  border-bottom: 1px solid #88d9de;
  cursor: pointer;
`;

export const ProfileMainSaveButton = styled.button`
  font-size: 1.3rem;
  outline: none;
  padding: 10px;
  margin: 10px 0;
  background: ${({ deleteBtn }) => (deleteBtn ? 'rgb(255,0,0,0.5)' : '')};
  cursor: pointer;
  font-family: 'Rubik', sans-serif;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.07);
  }
`;
