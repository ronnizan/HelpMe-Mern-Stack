import styled from 'styled-components';


export const Sidenav = styled.div`
  flex: 0.1;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-right: 1px solid lightgrey;
  padding-right: 10px;
  
  @media screen and (max-width: 768px) {
    flex: 100%;
    align-items: center;
    border-right: none;
    border-bottom: 1px solid lightgrey;
    padding-right: 0px;
    padding-bottom: 10px;
  }
`;
export const ProfileSidenavImg = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 10px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  right: 20px;
  cursor: ${({ isThisUsersProfile }) => (isThisUsersProfile ? 'pointer' : '')};
  @media screen and (max-width: 1368px) {
    right: 0px;
  }
`;
export const ProfileSidenavDescription = styled.p`
  width: 150px;
  padding: 15px 0;
  text-align: center;
  font-size: 1.3rem;
  font-family: 'Rubik', sans-serif;

`;
export const UploadImageInput = styled.input`
  display: none;
`;


