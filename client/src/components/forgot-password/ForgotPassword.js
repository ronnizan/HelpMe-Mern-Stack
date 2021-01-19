import React, { useState } from 'react';
import Loader from '../loader/Loader';
import {
  ActivateContainer,
  ActivateButton,
  Input,
  ActivateText,
  RedirectLink,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/actions/userActions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const userForgotPasswordState = useSelector(
    (state) => state.userForgotPassword
  );
  const { message, loading } = userForgotPasswordState;
  return (
    <ActivateContainer>
      {loading && <Loader />}
      {!message || loading ? (
        <>
          <ActivateText>Please enter your email address</ActivateText>
          <Input onChange={(e) => setEmail(e.target.value)}></Input>
          <ActivateButton
            disabled={message}
            onClick={() => {
              dispatch(forgotPassword(email));
            }}
          >
            Send
          </ActivateButton>
        </>
      ) : null}
      {message && <RedirectLink to='/signin'>To SignIn</RedirectLink>}
    </ActivateContainer>
  );
};

export default ForgotPassword;
