import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from '../../redux/actions/userActions';
import {
  MobileNavContainer,
  Icon,
  CloseIcon,
  MobileNavWrapper,
  MobileNavMenu,
  MobileNavRoute,
  MobileNavLink,
  SideBtnWrap,
  MobileLogBtn,
  MobileNavRouteNonActive,
} from './style';
const MobileNav = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userState = useSelector((state) => state.userLogin);
  const { userInfo } = userState;

  return (
    <>
      {location.pathname === '/' && !userInfo?.name ? (
        <MobileNavContainer isOpen={isOpen} onClick={toggle}>
          <Icon onClick={toggle}>
            <CloseIcon />
          </Icon>
          <MobileNavWrapper>
            <MobileNavMenu>
              <MobileNavLink to='about' onClick={toggle}>
                About
              </MobileNavLink>
              <MobileNavLink to='discover' onClick={toggle}>
                Discover
              </MobileNavLink>
              <MobileNavLink to='services' onClick={toggle}>
                Services
              </MobileNavLink>
              <MobileNavLink to='faq' onClick={toggle}>
                FAQ's
              </MobileNavLink>
              <br />
              <SideBtnWrap>
                <MobileLogBtn to='/signup'>Sign Up</MobileLogBtn>
                <MobileLogBtn to='/signin'>Sign In</MobileLogBtn>
              </SideBtnWrap>
            </MobileNavMenu>
          </MobileNavWrapper>
        </MobileNavContainer>
      ) : (
        userInfo &&
        userInfo.name && (
          <MobileNavContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
              <CloseIcon />
            </Icon>
            <MobileNavWrapper>
              <MobileNavMenu>
                {location.pathname !== `/profile/${userInfo.id}` ? (
                  <MobileNavRoute to={`/profile/${userInfo.id}`}>
                    My Profile
                  </MobileNavRoute>
                ) : (
                  <MobileNavRouteNonActive>My Profile</MobileNavRouteNonActive>
                )}
                <MobileNavRoute to='/browse'>Browse Posts</MobileNavRoute>
                <MobileNavRoute to='/add-post'>Add Post</MobileNavRoute>

                <MobileNavRoute to='/profiles'>Profiles</MobileNavRoute>
                <MobileNavLink
                  to='/'
                  onClick={() => {
                    dispatch(logout());
                    toggle();
                  }}
                >
                  Logout
                </MobileNavLink>
              </MobileNavMenu>
            </MobileNavWrapper>
          </MobileNavContainer>
        )
      )}
    </>
  );
};

export default MobileNav;
