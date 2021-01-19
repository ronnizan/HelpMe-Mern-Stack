import React, { useRef } from 'react';
import AnonymousUser from '../../images/icons/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { IconContext } from 'react-icons/lib';
import {
  Sidenav,
  ProfileSidenavImg,
  UploadImageInput,
  ProfileSidenavDescription,
} from './style';
import Rating from '../rating/Rating';
import {
  uploadProfileImage,
} from '../../redux/actions/profileActions';

const ProfileSidenav = ({ setActiveLink,isThisUsersProfile,profile }) => {

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const uploadProfileImageState = useSelector(
    (state) => state.uploadProfileImage
  );
  const { loading: uploadProfileImageLoading } = uploadProfileImageState;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    dispatch(uploadProfileImage(file));
  };

  const setImage = () => {
    if (!uploadProfileImageLoading ) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <Sidenav>
        <ProfileSidenavImg
          isThisUsersProfile={isThisUsersProfile}
          title={`${
            isThisUsersProfile
              ? 'Click to Change your profile image'
              : profile && profile.user.name
          }`}
          onClick={isThisUsersProfile ? setImage : undefined}
          src={
            profile && profile.profileImage
              ? profile.profileImage
              : AnonymousUser
          }
        ></ProfileSidenavImg>
        {isThisUsersProfile ? (
          <UploadImageInput
            ref={inputRef}
            onChange={uploadFileHandler}
            type='file'
          ></UploadImageInput>
        ) : null}
        <ProfileSidenavDescription>
          {profile && profile.user.name}
        </ProfileSidenavDescription>

        {profile && profile.description && (
          <ProfileSidenavDescription>
            {profile.description}
          </ProfileSidenavDescription>
        )}

        {profile && profile.region && (
          <ProfileSidenavDescription>
            {profile.region}
          </ProfileSidenavDescription>
        )}

        <IconContext.Provider value={{ color: 'gold' }}>
          <Rating
            color={'gold'}
            value={profile && profile.rating ? profile.rating : 'No rating yet'}
            text={profile && profile.numReviews ? profile.numReviews : '0'}
            setActiveLink={setActiveLink}
          />
        </IconContext.Provider>
      </Sidenav>
    </>
  );
};

export default ProfileSidenav;
