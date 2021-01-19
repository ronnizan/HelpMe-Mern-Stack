import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { GoogleButton } from './style';
import { FcGoogle } from 'react-icons/fc';
import { loginWithGoogle } from '../../redux/actions/userActions';

const Google = () => {
  const dispatch = useDispatch();
  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      onSuccess={(response) => dispatch(loginWithGoogle(response))}
      onFailure={(response) => dispatch(loginWithGoogle(response))}
      render={(renderProps) => (
        <GoogleButton
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <FcGoogle /> <span style={{ marginRight: '10px' }}></span> Login with
          Google
        </GoogleButton>
      )}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Google;
