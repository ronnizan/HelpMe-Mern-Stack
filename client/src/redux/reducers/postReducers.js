import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  ADD_POST_RESET,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAIL,
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAIL,
  MARK_POST_AS_COMPLETED_REQUEST,
  MARK_POST_AS_COMPLETED_SUCCESS,
  MARK_POST_AS_COMPLETED_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  GET_POST_RESET,
  ADD_ACCEPTED_USER_REQUEST,
  ADD_ACCEPTED_USER_SUCCESS,
  ADD_ACCEPTED_USER_FAIL,
  REMOVE_ACCEPTED_USER_REQUEST,
  REMOVE_ACCEPTED_USER_SUCCESS,
  REMOVE_ACCEPTED_USER_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
} from '../constants/postConstants';
import { USER_LOGOUT } from '../constants/userConstants';

export const addCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return { loading: true };
    case ADD_COMMENT_SUCCESS:
      return {
        loading: false,
        lastComment: action.payload,
      };
    case ADD_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const addAcceptedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ACCEPTED_USER_REQUEST:
      return { loading: true };
    case ADD_ACCEPTED_USER_SUCCESS:
      return {
        loading: false,
        lastUserAccepted: action.payload,
      };
    case ADD_ACCEPTED_USER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const removeAcceptedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_ACCEPTED_USER_REQUEST:
      return { loading: true };
    case REMOVE_ACCEPTED_USER_SUCCESS:
      return {
        loading: false,
        successMessage: "Successfully canceled you're participation",
      };
    case REMOVE_ACCEPTED_USER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const getPostReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return { loading: true };
    case GET_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload.post,
        checkIfUserAccepted: action.payload.checkIfUserAccepted,
      };
    case GET_POST_FAIL:
      return { loading: false, error: action.payload };

    case ADD_ACCEPTED_USER_SUCCESS:
      const postCopy = { ...state.post };
      postCopy.usersAccepted.push(action.payload.lastUserAccepted);
      const checkIfUserAccepted = state.post.usersAccepted.find(
        (usersAccepted) =>
          usersAccepted.profile.user.toString() ===
          action.payload.userId.toString()
      );
      return {
        loading: false,
        post: postCopy,
        checkIfUserAccepted: checkIfUserAccepted ? true : false,
      };
    case ADD_COMMENT_SUCCESS:
      const postStateCopy = { ...state.post };
      postStateCopy.comments.push(action.payload);
      return {
        loading: false,
        post: postStateCopy,
        checkIfUserAccepted: state.checkIfUserAccepted,
      };

    case REMOVE_ACCEPTED_USER_SUCCESS:
      const usersAcceptedIndex = state.post.usersAccepted.findIndex(
        (acceptedUserObj) =>
          acceptedUserObj.profile.user === action.payload.receivedUserId
      );
      const post = { ...state.post };
      post.usersAccepted.splice(usersAcceptedIndex, 1);
      const checkIfCurrentUserAccepted = state.post.usersAccepted.find(
        (usersAccepted) =>
          usersAccepted.profile.user.toString() ===
          action.payload.userId.toString()
      );
      return {
        loading: false,
        post: post,
        checkIfUserAccepted: checkIfCurrentUserAccepted ? true : false,
      };
    case GET_POST_RESET:
      return {};

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return {
        loading: false,
        successMessage: 'Successfully deleted your post',
      };
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const markPostAsCompletedReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_POST_AS_COMPLETED_REQUEST:
      return { loading: true };
    case MARK_POST_AS_COMPLETED_SUCCESS:
      return {
        loading: false,
        successMessage: 'Successfully marked your post as completed',
      };
    case MARK_POST_AS_COMPLETED_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const addPostReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { loading: true };
    case ADD_POST_SUCCESS:
      return {
        loading: false,
        successMessage: 'Successfully added your post',
      };
    case ADD_POST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    case ADD_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSTS_REQUEST:
      return { loading: true };
    case GET_ALL_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };
    case GET_ALL_POSTS_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getUserPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_POSTS_REQUEST:
      return { loading: true };
    case GET_USER_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };
    case GET_USER_POSTS_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    case MARK_POST_AS_COMPLETED_SUCCESS:
      const copiedPostsWithUpdatedPost = state.posts.map((post) => {
        if (post._id === action.payload) {
          post.completed = true;
        }
        return post;
      });
      return { loading: false, posts: copiedPostsWithUpdatedPost };
    case DELETE_POST_SUCCESS:
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload
      );
      const posts = [...state.posts];
      posts.splice(postIndex, 1);

      return { loading: false, posts: posts };
    default:
      return state;
  }
};
