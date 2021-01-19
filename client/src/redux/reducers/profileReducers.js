import {
  // CREATE_PROFILE_REQUEST,
  // CREATE_PROFILE_SUCCESS,
  // CREATE_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_RESET,
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
import { USER_LOGOUT } from '../constants/userConstants';

export const editProfilePreferencesReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PROFILE_PREFERENCES_REQUEST:
      return { loading: true };
    case EDIT_PROFILE_PREFERENCES_SUCCESS:
      return { loading: false, profile: action.payload };
    case EDIT_PROFILE_PREFERENCES_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const editProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PROFILE_REQUEST:
      return { loading: true };
    case EDIT_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case EDIT_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const getProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { loading: true };
    case GET_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case GET_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case UPLOAD_USER_IMAGE_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, profileImage: action.payload },
      };
    case ADD_REVIEW_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
      };
    case GET_PROFILE_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const getAllProfilesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PROFILES_REQUEST:
      return { loading: true };
    case GET_ALL_PROFILES_SUCCESS:
      return { loading: false, profiles: action.payload };
    case GET_ALL_PROFILES_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const uploadProfileImageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_USER_IMAGE_REQUEST:
      return { loading: true };
    case UPLOAD_USER_IMAGE_SUCCESS:
      return {
        loading: false,
        successMessage: 'Successfully uploaded your image',
      };
    case UPLOAD_USER_IMAGE_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const addReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return { loading: true };
    case ADD_REVIEW_SUCCESS:
      return {
        loading: false,
        successMessage: 'Successfully added your review',
      };
    case ADD_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
