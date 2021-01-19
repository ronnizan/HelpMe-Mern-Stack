import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  border-bottom: 8px solid #222;
  min-height: 800px;
  font-family: 'Rubik', sans-serif;

  @media screen and (max-width: 768px) {
    min-height: 200px;
  }
`;

export const Frame = styled.div`
  margin-bottom: 40px;
`;

export const Inner = styled.div`
  display: flex;
  padding: 70px 45px;
  flex-direction: column;
  max-width: 815px;
  margin: auto;
`;

export const Title = styled.h1`
  font-size: 50px;
  line-height: 1.1;
  margin-top: 0;
  margin-bottom: 8px;
  color: black;
  text-align: center;
  font-family: 'Nerko One', cursive;
  @media (max-width: 600px) {
    font-size: 35px;
  }
`;

export const Item = styled.div`
  color: black;
  margin-bottom: 10px;
  margin: auto;
  max-width: 670px;
  width: 100%;
  border: 1px solid black;
  ${'' /* background:lightgrey; */}
  transition: 0.8s all ease;
  &:first-of-type {
    margin-top: 3em;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 1px;
  font-size: 26px;
  font-weight: normal;
  background: transparent;
  padding: 0.8em 1.2em 0.8em 1.2em;
  user-select: none;
  align-items: center;
  ${'' /* border-bottom: 1px solid black; */}
  img {
    width: 24px;

    @media (max-width: 600px) {
      width: 16px;
    }
  }
  @media (max-width: 600px) {
    font-size: 16px;
  }
  transition: 0.8s all ease;

`;

export const Body = styled.div`
  max-height: 1200px;
  font-size: 26px;
  font-weight: normal;
  line-height: normal;
  background: transparent;
  padding: 0.8em 2.2em 0.8em 1.2em;
  white-space: pre-wrap;
  user-select: none;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }

`;
