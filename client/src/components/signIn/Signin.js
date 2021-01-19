import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import {
  Container,
  FormWrap,
  ForgotPasswordLink,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from './style';
import { login } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Google from '../google/Google';
import Facebook from '../facebook/Facebook';
import Loader from '../loader/Loader';
import { USER_LOGOUT } from '../../redux/constants/userConstants';

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userState = useSelector((state) => state.userLogin);
  const { userInfo,loading } = userState;
  const loginUser = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo?.id) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.id]);
  return (
    <>
      <Container>
        <FormWrap>
          <FormContent>
            <Form onSubmit={loginUser}>
            {loading && <Loader />}
              <FormH1>Sign In</FormH1>
              <FormLabel htmlFor='for'>Email:</FormLabel>
              <FormInput
                autoComplete='false'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type='email'
                required
              />
              <FormLabel htmlFor='for'>Password:</FormLabel>
              <FormInput
                autoComplete='false'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type='password'
                required
              />
              <FormButton type='submit'>Login</FormButton>
              <br />
              <IconContext.Provider value={{ size: '25px' }}>
                <Google />
              </IconContext.Provider>
              <br />
              <IconContext.Provider value={{ size: '25px', color: 'white' }}>
                <Facebook />
              </IconContext.Provider>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <Text>Forgot password?</Text>
                <ForgotPasswordLink to='/forgot-password'>
                  Click here!
                </ForgotPasswordLink>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <Text>Not Registered?</Text>
                <ForgotPasswordLink onClick={()=>{
                  dispatch({ type:USER_LOGOUT})
                }} to='/signup'>
                  Click here!
                </ForgotPasswordLink>
              </div>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Signin;
