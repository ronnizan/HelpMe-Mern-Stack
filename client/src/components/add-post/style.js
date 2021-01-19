import styled from 'styled-components';
import DatePicker from 'react-datepicker';

export const AddPostContainer = styled.div`
  max-width: 1160px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 880px) {
  }
`;
export const AddPostTitle = styled.h1`
  font-family: 'Nerko One', cursive;
  margin: 30px 0;
`;

export const AddPostForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
`;
export const PostFormRow = styled.div`
  display: flex;
  margin: 20px auto;
  align-items: space-between;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
`;
export const PostDatePicker = styled(DatePicker)`
  cursor: pointer;
  width: 100%;
`;

export const AddPostLabel = styled.label`
  padding: 10px;
  font-family: 'Nerko One', cursive;
  font-size: 1.3rem;
  text-align: center;
`;
export const AddPostImageLabel = styled.label`
  padding: 10px;
  font-family: 'Nerko One', cursive;
  font-size: 1.3rem;
  width: 90%;
  margin: 0 auto;
  text-align: center;
`;
export const AddPostInput = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  background: width;
  border-bottom: 1px solid black;
  font-size: 1.3rem;
  text-align: center;
  width: 100%;
`;
export const AddPostTextArea = styled.textarea`
  border: none;
  outline: none;
  padding: 40px;
  border-bottom: 1px solid black;
  font-size: 1.3rem;
  width: 100%;
  text-align: left;
`;
export const AddPostSelect = styled.select`
  border: none;
  outline: none;
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
`;
export const AddPostGoogleMap = styled.iframe`
  border: none;
  outline: none;
  width: 100%;
  height: 300px;
  cursor: pointer;
`;

export const UploadImageInput = styled.input`
  display: none;
`;
export const SaveButton = styled.button`
  font-size: 1.3rem;
  outline: none;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.07);
  }
`;
