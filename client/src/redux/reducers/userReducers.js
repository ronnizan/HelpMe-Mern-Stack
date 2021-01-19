import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  USER_LOGOUT,
  FIRST_USER_REGISTER_FAIL,
  FIRST_USER_REGISTER_REQUEST,
  FIRST_USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo:  action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
export const userRegisterRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case FIRST_USER_REGISTER_REQUEST:
      return { loading: true }
    case FIRST_USER_REGISTER_SUCCESS:
      return { loading: false, message: action.payload }
    case FIRST_USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true }
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload }
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true }
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload }
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, message: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true }
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true }
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


