import React from 'react';
import Loader from '../loader/Loader';
import {
  ActivateContainer,
  ActivateButton,
  ActivateText,
  RedirectLink,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/userActions';

const ActivateAccount = ({ token }) => {
  const dispatch = useDispatch();
  const userRegisterState = useSelector((state) => state.userRegister);
  const { message, loading } = userRegisterState;
  return (
    <ActivateContainer>
      {loading && <Loader />}
      <ActivateText>Please Click to activate your account</ActivateText>
      {!message || loading ? (
        <ActivateButton
          disabled={message}
          onClick={() => {
            dispatch(register(token));
          }}
        >
          Activate
        </ActivateButton>
      ) : null}
      {message && <RedirectLink to='/signin'>To SignIn</RedirectLink>}
    </ActivateContainer>
  );
};

export default ActivateAccount;
