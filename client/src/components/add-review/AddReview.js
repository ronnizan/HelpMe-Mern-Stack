import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import {
  AddReviewForm,
  AddReviewRatingsContainer,
  AddReviewTitle,
  AddReviewInput,
  AddReviewLabel,
  SaveButton,
} from './style';
import { addReviewToUser } from '../../redux/actions/profileActions';

const AddReview = () => {
  const getProfileState = useSelector((state) => state.getProfile);
  const { profile } = getProfileState;
  const addReviewState = useSelector((state) => state.addReview);
  const { loading } = addReviewState;
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const stars = [1, 2, 3, 4, 5];

  const addReview = (e) => {
    e.preventDefault();
    dispatch(addReviewToUser(profile._id, rating, comment));
  };

  return (
    <>
        <AddReviewForm onSubmit={addReview}>
          {loading && <Loader />}
          <AddReviewTitle>Add Review:</AddReviewTitle>
          <AddReviewInput
            onChange={(e) => setComment(e.target.value)}
            placeholder='add your review'
          ></AddReviewInput>
          <br />
          <AddReviewLabel htmlFor=''>Rating:</AddReviewLabel>
          <br />
          <IconContext.Provider value={{ color: 'gold' }}>
            <AddReviewRatingsContainer>
              {stars.map((number) =>
                number > rating ? (
                  <AiOutlineStar
                    key={number}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setRating(number)}
                  ></AiOutlineStar>
                ) : (
                  <AiFillStar
                    key={number}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setRating(number)}
                  ></AiFillStar>
                )
              )}
            </AddReviewRatingsContainer>
            <br />
          </IconContext.Provider>
          <SaveButton type='submit'>Send</SaveButton>
        </AddReviewForm>
    </>
  );
};

export default AddReview;
