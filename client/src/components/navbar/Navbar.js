import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavLinksRedirect,
  NavBtn,
  NavBtnLink,
  NavLinksNonActive,
} from './style';
import { logout } from '../../redux/actions/userActions';
const Navbar = ({ toggle }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userState = useSelector((state) => state.userLogin);
  const { userInfo } = userState;

  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return ()=>{
      window.removeEventListener('scroll', changeNav);
    }
  }, []);
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to='/' onClick={toggleHome}>
              <span style={{ color: '#F7D4C2' }}>H</span>
              <span style={{ color: '#88D9DE' }}>e</span>
              <span style={{ color: '#F7D4C2' }}>l</span>
              <span style={{ color: '#88D9DE' }}>p</span>
              <span style={{ color: '#F7D4C2' }}>M</span>
              <span style={{ color: '#88D9DE' }}>E</span>
            </NavLogo>
            {location.pathname === '/signin' ||
            location.pathname === '/signup' ? null : (
              <MobileIcon onClick={toggle}>
                <FaBars />
              </MobileIcon>
            )}
            <NavMenu>
              {userInfo && userInfo.name ? (
                <>
                  <NavItem>
                    <NavLinks to='/'>Hi {userInfo.name}!</NavLinks>
                  </NavItem>
                  <NavItem>
                    {location.pathname !== `/profile/${userInfo.id}` ? (
                      <NavLinksRedirect to={`/profile/${userInfo.id}`}>
                        My Profile
                      </NavLinksRedirect>
                    ) : (
                      <NavLinksNonActive>My Profile</NavLinksNonActive>
                    )}
                  </NavItem>
                  <NavItem>
                    <NavLinksRedirect to='/browse'>Browse Posts</NavLinksRedirect>
                  </NavItem>
                  <NavItem>
                    <NavLinksRedirect to='/add-post'>Add Post</NavLinksRedirect>
                  </NavItem>
                  <NavItem>
                    <NavLinksRedirect to='/profiles'>Profiles</NavLinksRedirect>
                  </NavItem>
                  <NavItem>
                    <NavLinksRedirect
                      to='/'
                      onClick={() => {
                        dispatch(logout());
                      }}
                    >
                      Logout
                    </NavLinksRedirect>
                  </NavItem>
                </>
              ) : location.pathname === '/' ? (
                <>
                  <NavItem>
                    <NavLinks
                      to='about'
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact='true'
                      offset={-280}
                      activeClass='active'
                    >
                      About
                    </NavLinks>
                  </NavItem>
                  <NavItem>
                    <NavLinks
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact='true'
                      offset={-280}
                      to='discover'
                    >
                      Discover
                    </NavLinks>
                  </NavItem>
                  <NavItem>
                    <NavLinks
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact='true'
                      offset={-280}
                      to='services'
                    >
                      Services
                    </NavLinks>
                  </NavItem>
                  <NavItem>
                    <NavLinks
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact='true'
                      offset={-280}
                      to='faq'
                    >
                      FAQ's
                    </NavLinks>
                  </NavItem>
                  <NavBtn>
                    <NavBtnLink to='/signup'>Sign Up</NavBtnLink>
                  </NavBtn>
                  <NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                  </NavBtn>
                </>
              ) : null}
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
