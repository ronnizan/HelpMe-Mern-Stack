import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useDispatch } from 'react-redux';
import { FacebookButton } from './style';
import { FaFacebookF } from 'react-icons/fa';
import { loginWithFacebook } from '../../redux/actions/userActions';

const Facebook = () => {
  const dispatch = useDispatch();
  return (
    <FacebookLogin
      appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
      autoLoad={false}
      callback={(response) => {
        dispatch(loginWithFacebook(response));
      }}
      render={(renderProps) => (
        <FacebookButton onClick={renderProps.onClick} type='button'>
          <FaFacebookF /> <span style={{ marginRight: '10px' }}></span>
          Login with Facebook <span style={{ marginRight: '3px' }}></span>
        </FacebookButton>
      )}
    />
  );
};

export default Facebook;
