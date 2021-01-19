import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterRequestReducer,
  userRegisterReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
  userDeleteReducer,
} from './reducers/userReducers';
import {
  getProfileReducer,
  getAllProfilesReducer,
  uploadProfileImageReducer,
  editProfileReducer,
  editProfilePreferencesReducer,
  addReviewReducer,
    
} from './reducers/profileReducers';
import { popupMessageReducer } from './reducers/popupMessageReducer';
import {
  addPostReducer,
  getAllPostsReducer,
  getUserPostsReducer,
  markPostAsCompletedReducer,
  deletePostReducer,
  getPostReducer,
  addAcceptedUserReducer,
  addCommentReducer,
  removeAcceptedUserReducer
} from './reducers/postReducers';

const reducer = combineReducers({
  popupMessage: popupMessageReducer,
  userLogin: userLoginReducer,
  userRegisterRequest: userRegisterRequestReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  userDelete: userDeleteReducer,
  getProfile: getProfileReducer,
  getAllProfiles:getAllProfilesReducer,
  uploadProfileImage: uploadProfileImageReducer,
  editProfile:editProfileReducer,
  editProfilePreferences:editProfilePreferencesReducer,
  addReview:addReviewReducer,
  addPost:addPostReducer,
  getAllPosts:getAllPostsReducer,
  getUserPosts:getUserPostsReducer,
  markPostAsCompleted:markPostAsCompletedReducer,
  deletePost:deletePostReducer,
  getPost:getPostReducer,
  addAcceptedUser:addAcceptedUserReducer,
  removeAcceptedUser:removeAcceptedUserReducer,
  addComment:addCommentReducer
});

const token = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : null;


const initialState = {
  userLogin: { userInfo: { token } },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
