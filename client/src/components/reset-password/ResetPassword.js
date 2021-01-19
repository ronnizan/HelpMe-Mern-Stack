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
import { resetPassword } from '../../redux/actions/userActions';

const ResetPassword = ({token}) => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userResetPasswordState = useSelector(
    (state) => state.userResetPassword
  );
  const { message, loading } = userResetPasswordState;
  return (
    <ActivateContainer>
      {loading && <Loader />}
      {!message || loading ? (
        <>
          <ActivateText>Please enter your new password</ActivateText>
          <Input type="password" onChange={(e) => setPassword(e.target.value)}></Input>
          <ActivateButton
            disabled={message}
            onClick={() => {
              dispatch(resetPassword(token, password));
            }}
          >
            Reset Password
          </ActivateButton>
        </>
      ) : null}
      {message && <RedirectLink to='/signin'>To SignIn</RedirectLink>}
    </ActivateContainer>
  );
};

export default ResetPassword;
