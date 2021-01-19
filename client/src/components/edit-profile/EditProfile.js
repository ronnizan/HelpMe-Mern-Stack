import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import {
  ProfileMainTitle,
  ProfileMainSelectInput,
  ProfileMainInputTextarea,
  ProfileMainInputLabel,
  ProfileMainSaveButton,
} from './style';

import { updateUserProfile } from '../../redux/actions/profileActions';
const EditProfile = ({profile}) => {
  const editProfileState = useSelector((state) => state.editProfile);
  const { loading } = editProfileState;
  const dispatch = useDispatch();
  const [profileRegion, setProfileRegion] = useState('');
  const [profileDescription, setProfileDescription] = useState('');
  useEffect(() => {
    setProfileRegion(profile?.region || '');
  }, [profile]);
  return (
    <>
        <ProfileMainTitle>Edit profile:</ProfileMainTitle>
        {loading && <Loader />}
        <ProfileMainInputLabel>
          Enter a short description about yourself:
        </ProfileMainInputLabel>
        <ProfileMainInputTextarea
          onChange={(e) => setProfileDescription(e.target.value)}
          type='text'
        />
        <br></br>
        <ProfileMainInputLabel>Enter your Region:</ProfileMainInputLabel>
        <ProfileMainSelectInput
          value={profileRegion}
          onChange={(e) => setProfileRegion(e.target.value)}
        >
          <option value='' defaultValue>Please select your Region</option>
          <option value='North Region'>North Region</option>
          <option value='Center Region'>Center Region</option>
          <option value='South Region'>South Region</option>
        </ProfileMainSelectInput>
        <ProfileMainSaveButton
          disabled={loading}
          onClick={() => {
            dispatch(
              updateUserProfile({
                region: profileRegion,
                description: profileDescription,
              })
            );
          }}
        >
          Save
        </ProfileMainSaveButton>
        <ProfileMainSaveButton
          disabled={loading}
          onClick={() => {
            dispatch(
              updateUserProfile({
                reset: true,
              })
            );
          }}
        >
          Reset your profile Details
        </ProfileMainSaveButton>
    </>
  );
};

export default EditProfile;
