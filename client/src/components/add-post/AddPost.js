import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../loader/Loader';
import { FcAddImage } from 'react-icons/fc';
import { IconContext } from 'react-icons/lib';
import {
  AddPostContainer,
  AddPostForm,
  PostFormRow,
  UploadImageInput,
  AddPostTextArea,
  PostDatePicker,
  AddPostTitle,
  AddPostSelect,
  AddPostGoogleMap,
  AddPostInput,
  AddPostLabel,
  AddPostImageLabel,
  SaveButton,
} from './style';
import { addPost } from '../../redux/actions/postActions';
import { ADD_POST_RESET } from '../../redux/constants/postConstants';

const AddPost = () => {
  const history = useHistory();
  const inputRef = useRef(null);
  const addPostState = useSelector((state) => state.addPost);
  const { loading, successMessage } = addPostState;
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [payment, setPayment] = useState('payment');
  const [price, setPrice] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [numOfPeopleNeeded, setNumOfPeopleNeeded] = useState(1);
  const [region, setRegion] = useState('North Region');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState("");
  const [dateType, setDateType] = useState('specific');

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setPostImage(file);
  };
  const setImage = () => {
    inputRef.current.click();
  };
  useEffect(() => {
    if (successMessage) {
      history.push('/browse');
      dispatch({ type: ADD_POST_RESET });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage]);

  const publishPost = (e) => {
    e.preventDefault();
    dispatch(
      addPost(
        title,
        description,
        payment,
        price,
        postImage,
        numOfPeopleNeeded,
        region,
        address,
        date
      )
    );
  };

  return (
    <>
      <AddPostContainer>
        <AddPostTitle>Add Post:</AddPostTitle>
        <AddPostForm onSubmit={publishPost}>
          <PostFormRow>
            {loading && <Loader />}
            <AddPostLabel>Title:</AddPostLabel>
            <AddPostInput
              onChange={(e) => setTitle(e.target.value)}
              type='text'
            ></AddPostInput>
          </PostFormRow>
          <PostFormRow>
            <AddPostLabel>Description:</AddPostLabel>
            <AddPostTextArea
              onChange={(e) => setDescription(e.target.value)}
            ></AddPostTextArea>
          </PostFormRow>
          <PostFormRow>
            <AddPostLabel>Select Date:</AddPostLabel>
            <AddPostSelect
              value={dateType}
              onChange={(e) => {
                setDateType(e.target.value)
                if (e.target.value === 'anyTime'){
                  setDate('');
                }
                }}
            >
              <option value={'specific'}>Specific Date</option>
              <option value={'anyTime'}>Any Time</option>
            </AddPostSelect>
          </PostFormRow>
          {dateType === "specific" &&<PostFormRow>
            <PostDatePicker
              title='select date'
              selected={date}
              onChange={(date) => setDate(date)}
              timeInputLabel='Time:'
              minDate={new Date()}
              dateFormat='MM/dd/yyyy h:mm aa'
              showTimeInput
              inline
            />
          </PostFormRow>}
          <PostFormRow>
            <AddPostLabel>Type of Activity:</AddPostLabel>
            <AddPostSelect
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value={'payment'}>With Payment</option>
              <option value={'volunteering'}>Volunteering</option>
            </AddPostSelect>
          </PostFormRow>
          {payment === 'payment' && (
            <PostFormRow>
              <AddPostLabel>Price in NIS:</AddPostLabel>
              <AddPostInput
                onChange={(e) => setPrice(e.target.value)}
                type='number'
              ></AddPostInput>
            </PostFormRow>
          )}
          <PostFormRow>
            <AddPostLabel>Number Of People Needed:</AddPostLabel>
            <AddPostSelect
              value={numOfPeopleNeeded}
              onChange={(e) => setNumOfPeopleNeeded(e.target.value)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </AddPostSelect>
          </PostFormRow>
          <PostFormRow>
            <AddPostLabel>Region:</AddPostLabel>
            <AddPostSelect
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value='North Region'>North Region</option>
              <option value='Center Region'>Center Region</option>
              <option value='South Region'>South Region</option>
            </AddPostSelect>
          </PostFormRow>
          <PostFormRow>
            <AddPostLabel>Address:</AddPostLabel>
            <AddPostInput
              onChange={(e) => setAddress(e.target.value)}
              type='text'
            ></AddPostInput>
          </PostFormRow>
          <PostFormRow>
              <AddPostGoogleMap
                title='map'
                src={
                  'https://maps.google.com/maps?q=' +
                  address +
                  '&t=&z=17&ie=UTF8&iwloc=&output=embed'
                }
              ></AddPostGoogleMap>
          </PostFormRow>
          <PostFormRow>
            <AddPostImageLabel>Add Image:</AddPostImageLabel>
            <UploadImageInput
              ref={inputRef}
              onChange={uploadFileHandler}
              type='file'
            ></UploadImageInput>
            <IconContext.Provider value={{ size: '20%' }}>
              <FcAddImage
                style={{ cursor: 'pointer' }}
                onClick={setImage}
              ></FcAddImage>
            </IconContext.Provider>
          </PostFormRow>
          <PostFormRow>{postImage && postImage.name}</PostFormRow>
          <PostFormRow>
            <SaveButton disabled={loading} type='submit'>
              Publish
            </SaveButton>
          </PostFormRow>
        </AddPostForm>
      </AddPostContainer>
    </>
  );
};

export default AddPost;
