import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const MobileNavContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;
export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;
export const MobileNavWrapper = styled.div`
  color: #fff;
`;
export const MobileNavMenu = styled.ul`
  display: grid;
  grid-template-columns: 11fr;
  grid-template-rows: repeat(6, 60px);
  text-align: center;
`;
export const MobileNavLink = styled(LinkS)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #F1D4C4;
    transition: 0.2s ease-in-out;
  }
`;

export const SideBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MobileLogBtn = styled(LinkR)`
  border-radius: 50px;
  margin:10px auto; 
  background: lightblue;
  white-space: nowrap;
  padding: 10px 64px;
  text-align: center;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #F1D4C4;
  }
`;  
export const MobileNavRoute = styled(LinkR)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #F1D4C4;
    transition: 0.2s ease-in-out;
  }
`;  
export const MobileNavRouteNonActive = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  color: #fff;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  &:hover {
    color: #F1D4C4;
    transition: 0.2s ease-in-out;
  }
`;  
