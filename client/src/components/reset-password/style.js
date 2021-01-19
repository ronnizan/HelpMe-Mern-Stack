import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const ActivateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
  height: 500px;
`;

export const ActivateText = styled.p`
  font-size: 20px;
  margin-bottom:20px;
`;
export const Input = styled.input`
  font-size: 20px;
  padding:10px;
  margin-bottom:20px;
  outline: none;
`;
export const ActivateButton = styled.button`
  background: #3B5998;
  padding: 18px 10px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display:flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`;
export const RedirectLink = styled(LinkR)`
  background: #3B5998;
  padding: 18px 10px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display:flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`;
