import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
  background: ${({ scrollNav }) => (scrollNav ? "#F0F2F5" : "transparent")};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
export const NavbarContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
  padding: 10px 24px;
  max-width: 1360px;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
export const NavLogo = styled(LinkR)`
  height: 80px;
  z-index: 1;
  max-width: 1100px;
  color: black;
  cursor: pointer;
  font-size: 1.9rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: black;
    z-index: 2000;
  }
`;
export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;
  padding: 5px 24px;
  justify-self: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const NavItem = styled.li`
  height: 80px;

`;
export const NavLinks = styled(LinkS)`
  color: black;
  display: flex;
  align-items: center;
  justify-content:center;
  text-decoration: none;
  padding: 10px 24px;
  height: 100%;
  cursor: pointer;
  &.active {
    border-bottom: 3px solid #F7D4C2;
    
  };
  &:hover {
    border-bottom: 3px solid #88D9DE;
  }
`;
export const NavLinksRedirect = styled(LinkR)`
  color: black;
  display: flex;
  align-items: center;
  justify-content:center;
  text-decoration: none;
  padding: 10px 24px;
  height: 100%;
  width: 100px;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #F7D4C2;
    
  };

  &:hover {
    border-bottom: 3px solid #88D9DE;
  }
`;
export const NavLinksNonActive = styled.button`
  color: black;
  display: flex;
  align-items: center;
  justify-content:center;
  text-decoration: none;
  padding: 10px 24px;
  height: 100%;
  width: 100px;
  cursor: pointer;
  border:none;
  background:transparent;
  outline:none;
  font-size:16px;

  &.active {
    border-bottom: 3px solid #F7D4C2;
    
  };
  &:hover {
    border-bottom: 3px solid #88D9DE;
  }
`;
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-left: 40px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const NavBtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #88D9DE; 
  white-space: nowrap;
  padding: 10px 22px;
  color:black;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #F7D4C2;
    color: #010606;
  }
`;
