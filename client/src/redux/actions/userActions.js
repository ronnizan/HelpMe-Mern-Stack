import axios from 'axios';
import { BaseUrl } from '../constants/endPoints';
import { popupMessage } from './popupMessageActions';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  FIRST_USER_REGISTER_FAIL,
  FIRST_USER_REGISTER_REQUEST,
  FIRST_USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from '../constants/userConstants';
import { getUserProfile } from './profileActions';

export const loginWithGoogle = (googleResponse) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post(`${BaseUrl}/api/user/google-login`, {
      idToken: googleResponse.tokenId,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { ...data, token: data.token },
    });
    dispatch(
      popupMessage({ type: 'success', content: 'Successfully logged in' })
    );
    localStorage.setItem('token', JSON.stringify(data.token));
    dispatch(getUserProfile(data.id));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response });
    console.log(error);
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
export const loginWithFacebook = (facebookResponse) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post(`${BaseUrl}/api/user/facebook-login`, {
      userID: facebookResponse.userID,
      accessToken: facebookResponse.accessToken,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { ...data, token: data.token },
    });
    dispatch(
      popupMessage({ type: 'success', content: 'Successfully logged in' })
    );
    localStorage.setItem('token', JSON.stringify(data.token));
    dispatch(getUserProfile(data.id));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response });
    console.log(error);
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

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      BaseUrl + '/api/user/signin',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    dispatch(
      popupMessage({ type: 'success', content: 'Logged in successfully' })
    );
    dispatch(getUserProfile(data.id));

    localStorage.setItem('token', JSON.stringify(data.token));
  } catch (error) {
    const errors = error.response.data.error;
    console.log(errors);
    dispatch({
      type: USER_LOGIN_FAIL,
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
export const getAuthUser = (token) => async (dispatch,getState) => {
  try {

    // const {
    //   getProfile: { profile },
    // } = getState();
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const { data } = await axios.get(BaseUrl + '/api/user/get-user', config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { ...data, token },
    });

    localStorage.setItem('token', JSON.stringify(token));
    // if (profile.user.id !== data.id) {
    //       dispatch(getUserProfile(data.id));
    // }
  } catch (error) {
    localStorage.removeItem('token');
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'something went wrong Please try again later',
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('paymentMethod');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch(
    popupMessage({
      type: 'error',
      content: 'You have been successfully logged out',
    })
  );

  // document.location.href = '/';
};

export const registerRequest = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: FIRST_USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      BaseUrl + '/api/user/signup',
      { name, email, password },
      config
    );

    dispatch({
      type: FIRST_USER_REGISTER_SUCCESS,
      payload: data.message,
    });
    dispatch(popupMessage({ type: 'success', content: data.message }));
  } catch (error) {
    dispatch({
      type: FIRST_USER_REGISTER_FAIL,
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

export const register = (token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      BaseUrl + '/api/user/account-activation',
      { token },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.message,
    });
    dispatch(popupMessage({ type: 'success', content: data.message }));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
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
export const resetPassword = (token, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      BaseUrl + '/api/user/reset-password',
      { token, newPassword },
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.message,
    });
    dispatch(popupMessage({ type: 'success', content: data.message }));
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
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

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      BaseUrl + '/api/user/forgot-password',
      { email },
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
    dispatch(popupMessage({ type: 'success', content: data.message }));
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
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

export const deleteUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${BaseUrl}/api/user/delete-account`,
      config
    );
    localStorage.removeItem('token');
    dispatch({ type: USER_LOGOUT });
    dispatch(
      popupMessage({
        type: 'error',
        content: data.message,
      })
    );
    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: DELETE_USER_FAIL,
      payload: message,
    });
  }
};
