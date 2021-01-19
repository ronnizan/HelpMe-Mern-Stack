import styled from 'styled-components';

export const ProfileMainTitle = styled.h1`
  font-family: 'Nerko One', cursive;
  margin: 30px 0;
`;
export const ProfileMainInputLabel = styled.label`
  padding: 10px;
  font-family: 'Rubik', sans-serif;
  font-size: 1.3rem;
`;
export const ProfileMainSelectInput = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  font-family: 'Rubik', sans-serif;
  background: transparent;
  font-size: 1.3rem;
  border-bottom: 1px solid #88d9de;
`;
export const ProfileMainInputTextarea = styled.textarea`
  padding: 20px;
  margin-bottom: 20px;
  border: none;
  font-family: 'Rubik', sans-serif;
  outline: none;
  background: transparent;
  font-size: 1.3rem;
  border-bottom: 1px solid #88d9de;
  resize: none;
`;
export const ProfileMainSaveButton = styled.button`
  font-size: 1.3rem;
  outline: none;
  padding: 10px;
  font-family: 'Rubik', sans-serif;
  margin: 10px 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.07);
  }
`;
