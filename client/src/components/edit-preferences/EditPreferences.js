import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { useHistory } from 'react-router-dom';
import {
  ProfileMainSelectInput,
  ProfileMainPhoneInputsWrapper,
  ProfileMainTitle,
  ProfileMainInputLabel,
  ProfileMainSaveButton,
  ProfileMainInput,
} from './style';
//need to add delete user
import { deleteUser } from '../../redux/actions/userActions';
import { updateUserProfilePreferences } from '../../redux/actions/profileActions';

const EditPreferences = ({ profile }) => {
  const history = useHistory();

  const editProfilePreferencesState = useSelector(
    (state) => state.editProfilePreferences
  );
  const { loading } = editProfilePreferencesState;
  const dispatch = useDispatch();
  const [sendSmsOnUserAcceptPost, setSendSmsOnUserAcceptPost] = useState(
    profile.preferences.sendSmsOnUserAcceptPost
  );
  const [
    sendSmsOnPostPeopleNeededReached,
    setSendSmsOnPostPeopleNeededReached,
  ] = useState(profile.preferences.sendSmsOnPostPeopleNeededReached);
  const [phoneNumber, setPhoneNumber] = useState(
    profile.preferences.phoneNumber
  );
  const [areaCode, setAreaCode] = useState(    profile.preferences.areaCode
    );
  return (
    <>
      <ProfileMainTitle>Preferences:</ProfileMainTitle>
      {loading && <Loader />}
      <ProfileMainInputLabel>
        Send an Sms Message when every user accepts your post:
      </ProfileMainInputLabel>
      <ProfileMainInput
        checked={sendSmsOnUserAcceptPost}
        onChange={(e) => {
          setSendSmsOnUserAcceptPost(e.target.checked);
        }}
        type='checkbox'
      ></ProfileMainInput>
      <ProfileMainInputLabel>
        Send an Sms Message when post's people needed expectation reached.
      </ProfileMainInputLabel>
      <ProfileMainInput
        checked={sendSmsOnPostPeopleNeededReached}
        onChange={(e) => {
          setSendSmsOnPostPeopleNeededReached(e.target.checked);
        }}
        type='checkbox'
      ></ProfileMainInput>
      {sendSmsOnUserAcceptPost || sendSmsOnPostPeopleNeededReached ? (
        <>
          <ProfileMainInputLabel>Phone Number:</ProfileMainInputLabel>
          <ProfileMainPhoneInputsWrapper>
            <ProfileMainSelectInput
              value={areaCode}
              onChange={(e) => setAreaCode(e.target.value)}
            >
              <option value='' disabled defaultValue>
                Please select your Area code
              </option>
              <option value='+97250'>050</option>
              <option value='+97251'>051</option>
              <option value='+97252'>052</option>
              <option value='+97253'>053</option>
              <option value='+97254'>054</option>
              <option value='+97255'>055</option>
              <option value='+97258'>058</option>
            </ProfileMainSelectInput>
            &nbsp;&nbsp;&nbsp;
            <ProfileMainInput
              phoneNumber={true}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              value={phoneNumber}
              type='text'
            ></ProfileMainInput>
          </ProfileMainPhoneInputsWrapper>
        </>
      ) : null}
      <ProfileMainSaveButton
        disabled={loading}
        onClick={() => {
          dispatch(
            updateUserProfilePreferences({
              sendSmsOnUserAcceptPost,
              sendSmsOnPostPeopleNeededReached,
              areaCode,
              phoneNumber
            })
          );
        }}
      >
        Save
      </ProfileMainSaveButton>
      <ProfileMainSaveButton
        deleteBtn={true}
        onClick={() => {
          dispatch(deleteUser());
          history.push('/');
        }}
        disabled={loading}
      >
        Delete your Account
      </ProfileMainSaveButton>
    </>
  );
};

export default EditPreferences;
