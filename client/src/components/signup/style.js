import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormWrap = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ForgotPasswordLink = styled(Link)`
  text-align: center;
  color: black;
  font-size: 14px;
  margin-left: 10px;
`;

export const FormContent = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

export const Form = styled.form`
  background: white;
  max-width: 400px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 10px 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 20px;
  color: black;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  border-bottom: 2px solid black;
  line-height: 40px;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 18px;
  color: black;
`;
export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-bottom: 2px solid black;
  font-size: 18px;
  outline: none;
`;

export const FormButton = styled.button`
  background: #01bf71;
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const Text = styled.span`
  text-align: center;
  color: black;
  font-size: 14px;
`;
export const AlreadyUserWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
