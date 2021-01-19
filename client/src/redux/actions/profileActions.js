import axios from 'axios';
import { BaseUrl } from '../constants/endPoints';
import { popupMessage } from './popupMessageActions';
import {
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_ALL_PROFILES_REQUEST,
  GET_ALL_PROFILES_SUCCESS,
  GET_ALL_PROFILES_FAIL,
  UPLOAD_USER_IMAGE_REQUEST,
  UPLOAD_USER_IMAGE_SUCCESS,
  UPLOAD_USER_IMAGE_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_PREFERENCES_REQUEST,
  EDIT_PROFILE_PREFERENCES_SUCCESS,
  EDIT_PROFILE_PREFERENCES_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
} from '../constants/profileConstants';

export const addReviewToUser = (profileId, rating, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ADD_REVIEW_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userInfo.token,
      },
    };
    const { data } = await axios.put(
      BaseUrl + '/api/profile/add-profile-review',
      { profileId, rating, comment },
      config
    );

    dispatch({
      type: ADD_REVIEW_SUCCESS,
      payload: data,
    });

    dispatch(
      popupMessage({
        type: 'success',
        content: "You're Review was successfully added",
      })
    );
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: ADD_REVIEW_FAIL,
      payload:
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'something went wrong Please try again later',
    });
    dispatch(
      popupMessage({
        type: 'error',
        content:
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'failed to add your review',
      })
    );
  }
};
export const updateUserProfilePreferences = ({
  sendSmsOnPostPeopleNeededReached,
  sendSmsOnUserAcceptPost,
  phoneNumber,
  areaCode,
}) => async (dispatch, getState) => {
  if (sendSmsOnPostPeopleNeededReached || sendSmsOnUserAcceptPost) {
    if (!areaCode || !phoneNumber) {
      dispatch(
        popupMessage({
          type: 'error',
          content: 'Area code and phone number are required',
        })
      );
      return;
    }
  }

  try {
    dispatch({
      type: EDIT_PROFILE_PREFERENCES_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userInfo.token,
      },
    };
    const { data } = await axios.put(
      BaseUrl + '/api/profile/update-profile-preferences',
      {
        sendSmsOnPostPeopleNeededReached,
        sendSmsOnUserAcceptPost,
        phoneNumber:
          sendSmsOnPostPeopleNeededReached || sendSmsOnUserAcceptPost
            ? phoneNumber
            : '',
        areaCode:
          sendSmsOnPostPeopleNeededReached || sendSmsOnUserAcceptPost
            ? areaCode
            : '',
      },
      config
    );

    dispatch({
      type: EDIT_PROFILE_PREFERENCES_SUCCESS,
      payload: data,
    });
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch(
      popupMessage({
        type: 'success',
        content: "You're Profile preferences has successfully changed",
      })
    );
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: EDIT_PROFILE_PREFERENCES_FAIL,
      payload:
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'something went wrong Please try again later',
    });
    dispatch(
      popupMessage({
        type: 'error',
        content: 'failed to change your profile Details',
      })
    );
  }
};

export const updateUserProfile = ({ description, region, reset }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: EDIT_PROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userInfo.token,
      },
    };
    const { data } = await axios.put(
      BaseUrl + '/api/profile/update-profile',
      { description, region, reset },
      config
    );

    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch(
      popupMessage({
        type: 'success',
        content: "You're Profile Details has successfully changed",
      })
    );
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload:
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'something went wrong Please try again later',
    });
    dispatch(
      popupMessage({
        type: 'error',
        content: 'failed to change your profile Details',
      })
    );
  }
};
export const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });
    dispatch({
      type: GET_PROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userInfo.token,
      },
    };
    const { data } = await axios.get(
      BaseUrl + '/api/profile/get-profile/' + id,
      config
    );

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch(
      popupMessage({
        type: 'error',
        content:
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'something went wrong Please try again later',
      })
    );
    dispatch({
      type: GET_PROFILE_FAIL,
      payload:
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'something went wrong Please try again later',
    });
  }
};

export const getAllProfiles = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_PROFILES_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userInfo.token,
      },
    };
    const { data } = await axios.get(BaseUrl + '/api/profile/profiles', config);
    console.log(data);

    dispatch({
      type: GET_ALL_PROFILES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PROFILES_FAIL,
      payload:
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'something went wrong Please try again later',
    });
  }
};

export const uploadProfileImage = (image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPLOAD_USER_IMAGE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + userInfo.token,
      },
    };
    const formData = new FormData();
    formData.append('image', image);
    const { data } = await axios.post(
      BaseUrl + '/api/upload-user-image',
      formData,
      config
    );
    dispatch({ type: UPLOAD_USER_IMAGE_SUCCESS, payload: data });
    dispatch(
      popupMessage({
        type: 'success',
        content: "You're Profile image has been successfully changed",
      })
    );
  } catch (error) {
    dispatch({
      type: UPLOAD_USER_IMAGE_FAIL,
      payload:
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'something went wrong Please try again later',
    });
    dispatch(
      popupMessage({
        type: 'error',
        content:
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'something went wrong Please try again later',
      })
    );
  }
};
