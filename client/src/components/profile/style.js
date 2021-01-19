import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1360px;
  margin: 50px auto;
`;
export const ProfileMainNav = styled.div`
  display: flex;
  @media screen and (max-width: 468px) {
    margin-right: ${({ activeLink }) =>
      activeLink === 'reviews' ? '50px' : '0'};
  }
`;

export const ProfileMainNavBtn = styled.button`
  border: none;
  font-size: 1.3rem;
  margin: 15px 10px;
  cursor: pointer;
  outline: none;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    position: relative;
  }
  &:nth-child(1) {
    border-bottom: ${({ activeLink }) =>
      activeLink === 'editProfile' ? '3px solid #88D9DE' : 'transparent'};
    font-weight: ${({ activeLink }) =>
      activeLink === 'editProfile' ? 'bold' : ''};
  }
  &:nth-child(2) {
    border-bottom: ${({ activeLink }) =>
      activeLink === 'myPosts' ? '3px solid #88D9DE' : 'transparent'};
    font-weight: ${({ activeLink }) =>
      activeLink === 'myPosts' ? 'bold' : ''};
  }
  &:nth-child(3) {
    border-bottom: ${({ activeLink }) =>
      activeLink === 'preferences' ? '3px solid #88D9DE' : 'transparent'};
    font-weight: ${({ activeLink }) =>
      activeLink === 'preferences' ? 'bold' : ''};
  }
  &:nth-child(4) {
    border-bottom: ${({ activeLink }) =>
      activeLink === 'reviews' ? '3px solid #88D9DE' : 'transparent'};
    font-weight: ${({ activeLink }) =>
      activeLink === 'reviews' ? 'bold' : ''};
  }
`;

export const ProfileMain = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;

`;
