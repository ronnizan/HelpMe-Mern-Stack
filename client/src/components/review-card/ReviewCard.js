import React from 'react';
import moment from 'moment';
import AnonymousUser from '../../images/icons/user.png';
import {
  ReviewsTitle,
  ReviewCardBox,
  ReviewCardBoxImageAndName,
  ReviewCardBoxTopLine,
  ReviewCardBoxTitle,
  ReviewCardBoxImage,
  ReviewCardBoxDate,
  ReviewCardBoxComment,
  
} from './style';
import Rating from '../rating/Rating';

const ReviewCard = ({ profile }) => {
  return (
    <>
      {profile &&
        profile.reviews.length > 0 &&
        profile.reviews.map((review) => (
          <ReviewCardBox key={review._id}>
            <ReviewCardBoxTopLine>
              <ReviewCardBoxImageAndName to={`/profile/${review.user}`}>
                <ReviewCardBoxImage
                  src={
                    review.profile?.profileImage
                      ? review.profile.profileImage
                      : AnonymousUser
                  }
                ></ReviewCardBoxImage>
                <ReviewCardBoxTitle>
                  {review.name}
                  <Rating
                    showText={false}
                    value={review.rating}
                    color={'gold'}
                    width={'100%'}
                  ></Rating>
                </ReviewCardBoxTitle>
              </ReviewCardBoxImageAndName>

              <ReviewCardBoxDate>
                {moment(review.createdAt).fromNow()}
              </ReviewCardBoxDate>
            </ReviewCardBoxTopLine>

            <ReviewCardBoxComment>{review.comment}</ReviewCardBoxComment>
          </ReviewCardBox>
        ))}
      {profile && profile.reviews.length === 0 && (
        <ReviewsTitle>No Reviews Yet. </ReviewsTitle>
      )}
    </>
  );
};

export default ReviewCard;
