import styled from 'styled-components/macro';


export const FacebookButton = styled.button`
  background: #3B5998;
  padding: 12px 0;
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