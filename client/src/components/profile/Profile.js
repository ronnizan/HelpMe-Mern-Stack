import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import {
  ProfileContainer,
  ProfileMainNavBtn,
  ProfileMain,
  ProfileMainNav,
} from './style';
import { getUserProfile } from '../../redux/actions/profileActions';
import EditProfile from '../edit-profile/EditProfile';
import EditPreferences from '../edit-preferences/EditPreferences';
import Reviews from '../reviews/Reviews';
import ProfileSidenav from '../profile-sidenav/ProfileSidenav';
import MyPosts from '../my-posts/MyPosts';
import { useHistory } from 'react-router-dom';
import { GET_PROFILE_RESET } from '../../redux/constants/profileConstants';
const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isThisUsersProfile, setIsThisUsersProfile] = useState(false);
  const [activeLink, setActiveLink] = useState('editProfile');
  const userState = useSelector((state) => state.userLogin);
  const { userInfo } = userState;
  const getProfileState = useSelector((state) => state.getProfile);
  const { profile, loading: getProfileLoading,error:getProfileError } = getProfileState;
  const uploadProfileImageState = useSelector(
    (state) => state.uploadProfileImage
  );
  const { loading: uploadProfileImageLoading } = uploadProfileImageState;

  useEffect(() => {
    const userId = match.params.id;
    //checks to see if no profile or not the user's profile
    if (!profile && !getProfileLoading) {
      dispatch(getUserProfile(userId));
    }
    if (profile && profile?.user._id !== userId && !getProfileLoading) {
      dispatch(getUserProfile(userId));
    }
    setIsThisUsersProfile(userInfo?.id === match.params.id);
    if (!isThisUsersProfile) {
      setActiveLink('reviews');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isThisUsersProfile, userInfo?.id, match.params.id]);

  useEffect(() => {
    if (getProfileError) {
      history.push('/');
      dispatch({ type: GET_PROFILE_RESET });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProfileError]);

  return (
    <>
      {getProfileLoading ? <Loader /> : null}
      {profile  && !getProfileLoading &&(
        <ProfileContainer>
          {uploadProfileImageLoading ? <Loader /> : null}
          <ProfileSidenav
            profile={profile}
            setActiveLink={setActiveLink}
            isThisUsersProfile={isThisUsersProfile}
          ></ProfileSidenav>
          <ProfileMain>
            <ProfileMainNav activeLink={activeLink}>
              {isThisUsersProfile && (
                <>
                  <ProfileMainNavBtn
                    activeLink={activeLink}
                    onClick={() => {
                      setActiveLink('editProfile');
                    }}
                  >
                    Edit Profile
                  </ProfileMainNavBtn>
                  <ProfileMainNavBtn
                    activeLink={activeLink}
                    onClick={() => {
                      setActiveLink('myPosts');
                    }}
                  >
                    My Posts
                  </ProfileMainNavBtn>
                  <ProfileMainNavBtn
                    activeLink={activeLink}
                    onClick={() => {
                      setActiveLink('preferences');
                    }}
                  >
                    Preferences
                  </ProfileMainNavBtn>
                  <ProfileMainNavBtn
                    activeLink={activeLink}
                    onClick={() => {
                      setActiveLink('reviews');
                    }}
                  >
                    Reviews
                  </ProfileMainNavBtn>
                </>
              )}
            </ProfileMainNav>
            {activeLink === 'editProfile' && isThisUsersProfile && (
              <EditProfile profile={profile}></EditProfile>
            )}
            {activeLink === 'preferences' && isThisUsersProfile && (
              <EditPreferences profile={profile}></EditPreferences>
            )}
            {activeLink === 'reviews' && (
              <Reviews profile={profile} isThisUsersProfile={isThisUsersProfile}></Reviews>
            )}
            {activeLink === 'myPosts' && (
              <MyPosts  isThisUsersProfile={isThisUsersProfile}></MyPosts>
            )}
          </ProfileMain>
        </ProfileContainer>
      )}
    </>
  );
};

export default Profile;
