import styled from 'styled-components';

export const MessageContainer = styled.div`
  background: ${({ error }) => (error ? '#DD4B39' : '#3B5998')};
  margin: 10px 15px 10px 5px;
  padding: 10px;
  display: flex;
  width: 25rem;
  top:20vh;
  position: fixed;
  align-items: center;
  font-size: 1.3rem;
  justify-content: center;
  z-index:10000;
  border-radius: 3px 3px 3px 3px;
  color: ${({ error }) => (error ? '#fff' : '#fff')};
  background-color: ${({ error }) => (error ? 'red' : 'green')};
  animation: slideInFromLeft 1s ease-in-out;
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(0);
    }
  }
  @media screen and (max-width: 868px) {
    width: 15rem;

  }
`;
