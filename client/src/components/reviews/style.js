import styled from 'styled-components';

export const ProfileMainReviews = styled.div`
  display: flex;
  min-height: 300px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media screen and (max-width:860px){
    justify-content: center;
    width:initial;
    margin:0 auto;
  }
  
`;

export const ReviewCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  justify-content:center;
  align-items: center;

`;