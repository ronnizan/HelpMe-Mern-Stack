import React, { useState, useEffect } from 'react';
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
  AlreadyUserWrapper
} from './style';
import { registerRequest } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Google from '../google/Google';
import Facebook from '../facebook/Facebook';
import Loader from '../loader/Loader';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userRegisterRequest = useSelector((state) => state.userRegisterRequest);
  const { loading } = userRegisterRequest;
  const userState = useSelector((state) => state.userLogin);
  const { userInfo } = userState;
  const loginUser = (e) => {
    e.preventDefault();
    dispatch(registerRequest(name, email, password));
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
              <FormH1>Register</FormH1>
              <FormLabel htmlFor='for'>Name:</FormLabel>
              <FormInput
                autoComplete='false'
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type='text'
                required
              />
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
              <FormButton disabled={loading} type='submit'>
                Register
              </FormButton>
              <br />
              <IconContext.Provider value={{ size: '25px' }}>
                <Google />
              </IconContext.Provider>
              <br />
              <IconContext.Provider value={{ size: '25px', color: 'white' }}>
                <Facebook />
              </IconContext.Provider>
              <AlreadyUserWrapper
              >
                <Text>Already a user?</Text>
                <ForgotPasswordLink to='/signin'>
                  Click here!
                </ForgotPasswordLink>
              </AlreadyUserWrapper>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Signup;
