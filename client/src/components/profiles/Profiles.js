import React, { useEffect } from 'react';
import AnonymousUser from '../../images/icons/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfiles } from '../../redux/actions/profileActions';
import Loader from '../loader/Loader';
import {
  ProfileCardsContainer,
  ProfilesTitle,
  ProfileCardBox,
  ProfileCardContent,
  ProfileCardNameAndRating,
  ReviewCardBoxImageContainer,
  ProfileCardImage,
  ProfileLink,
} from './style';
import Rating from '../rating/Rating';
const Profiles = ({ match }) => {
  const dispatch = useDispatch();
  const getAllProfilesState = useSelector((state) => state.getAllProfiles);
  const { profiles, loading } = getAllProfilesState;
  useEffect(() => {
    dispatch(getAllProfiles());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading && <Loader />}
      <ProfileCardsContainer>
        <ProfilesTitle>Profiles</ProfilesTitle>
        {profiles &&
          profiles.map((profile) => (
            <ProfileCardBox key={profile._id}>
              <ProfileLink to={'/profile/' + profile.user._id}>
                <ProfileCardContent>
                  <ReviewCardBoxImageContainer>
                    <ProfileCardImage
                      src={
                        profile.profileImage
                          ? profile.profileImage
                          : AnonymousUser
                      }
                    ></ProfileCardImage>
                  </ReviewCardBoxImageContainer>
  
                  <ProfileCardNameAndRating> 
                    {profile.user.name} <span style={{marginRight: '10px' }}></span>
                    <Rating
                      showText={false}
                      value={profile.rating}
                      color={'gold'}
                      width={'100%'}
                      text={profile.numReviews}
                      fromProfiles={true}
                    ></Rating>
                  </ProfileCardNameAndRating>
                </ProfileCardContent>
              </ProfileLink>
            </ProfileCardBox>
          ))}
      </ProfileCardsContainer>
    </>
  );
};

export default Profiles;
