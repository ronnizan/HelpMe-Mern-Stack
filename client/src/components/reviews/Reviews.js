import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { ProfileMainReviews, ReviewCardsContainer } from './style';
import AddReview from '../add-review/AddReview';
import ReviewCard from '../review-card/ReviewCard';

const Reviews = ({ isThisUsersProfile,profile }) => {
  const userState = useSelector((state) => state.userLogin);
  const { userInfo } = userState;
  const [isUserAlreadyCommented, setIsUserAlreadyCommented] = useState(false);

  useEffect(() => {
    setIsUserAlreadyCommented(
      profile?.reviews.find((review) => review.user === userInfo.id)
    );
  }, [profile, userInfo.id]);

  return (
    <>
      <ProfileMainReviews>
        {!isThisUsersProfile && !isUserAlreadyCommented && (
          <AddReview></AddReview>
        )}
        <br />
        <ReviewCardsContainer>
          <ReviewCard profile={profile}></ReviewCard>
        </ReviewCardsContainer>
      </ProfileMainReviews>
    </>
  );
};
export default Reviews;
