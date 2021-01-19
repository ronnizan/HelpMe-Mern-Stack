import axios from 'axios';
import { BaseUrl } from '../constants/endPoints';
import { popupMessage } from './popupMessageActions';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAIL,
  MARK_POST_AS_COMPLETED_REQUEST,
  MARK_POST_AS_COMPLETED_SUCCESS,
  MARK_POST_AS_COMPLETED_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
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

export const addCommentWithSocketListener = (socket, userId, content) => async (
  dispatch,
  getState
) => {
  let receivedUserIdFromSocket;
  try {
    if (userId && content) {
      dispatch({
        type: ADD_COMMENT_REQUEST,
      });
      socket.emit('sendMessage', userId, content, (error) => {
        if (error) {
          dispatch({
            type: ADD_COMMENT_FAIL,
            payload: 'failed to add comment',
          });
          dispatch(
            popupMessage({
              type: 'error',
              content: 'failed to add comment',
            })
          );
        }
      });
    } else {
      socket.on(
        'addLastCommentToPost',
        ({ lastComment, userId: receivedUserId }) => {
          receivedUserIdFromSocket = receivedUserId;
          dispatch({
            type: ADD_COMMENT_SUCCESS,
            payload: lastComment,
          });
        }
      );
    }
  } catch (error) {
    if (receivedUserIdFromSocket === userId) {
      dispatch({
        type: ADD_COMMENT_FAIL,
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
              : 'failed to send message',
        })
      );
    }
  }
};

export const removeAcceptedUserWithSocketListener = (
  socket,
  userId,
  isUserClicked
) => async (dispatch, getState) => {
  let receivedUserIdFromSocket;
  try {
    if (isUserClicked) {
      dispatch({
        type: REMOVE_ACCEPTED_USER_REQUEST,
      });
      socket.emit('removeAcceptedUser', userId, (error) => {
        if (error) {
          dispatch({
            type: REMOVE_ACCEPTED_USER_FAIL,
            payload: error,
          });
          dispatch(
            popupMessage({
              type: 'error',
              content: error,
            })
          );
        }
      });
    } else {
      socket.on('removeAcceptedUserFromPost', ({ userId: receivedUserId }) => {
        receivedUserIdFromSocket = receivedUserId;
        dispatch({
          type: REMOVE_ACCEPTED_USER_SUCCESS,
          payload: {receivedUserId,userId},
        });
        if (receivedUserIdFromSocket === userId) {
          dispatch(
            popupMessage({
              type: 'success',
              content: "Successfully canceled you're participation",
            })
          );
        }
      });
    }
  } catch (error) {
    if (receivedUserIdFromSocket === userId) {
      dispatch({
        type: REMOVE_ACCEPTED_USER_FAIL,
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
              : "failed to cancel you're participation",
        })
      );
    }
  }
};
// export const removeAcceptedUser = (postId) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: REMOVE_ACCEPTED_USER_REQUEST,
//     });
//     const {
//       userLogin: { userInfo },
//     } = getState();
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + userInfo.token,
//       },
//     };
//     console.log(config);
//     const { data } = await axios.delete(
//       BaseUrl + '/api/posts/remove-accepted-user/' + postId,
//       config
//     );

//     dispatch({
//       type: REMOVE_ACCEPTED_USER_SUCCESS,
//       payload: data,
//     });
//     dispatch(
//       popupMessage({
//         type: 'success',
//         content: "Successfully canceled you're participation",
//       })
//     );
//   } catch (error) {
//     dispatch({
//       type: REMOVE_ACCEPTED_USER_FAIL,
//       payload:
//         error.response && error.response.data && error.response.data.error
//           ? error.response.data.error
//           : 'something went wrong Please try again later',
//     });
//     dispatch(
//       popupMessage({
//         type: 'error',
//         content:
//           error.response && error.response.data && error.response.data.error
//             ? error.response.data.error
//             : 'failed to accept the post',
//       })
//     );
//   }
// };
export const addAcceptedUserWithSocketListener = (
  socket,
  userId,
  isUserClicked
) => async (dispatch, getState) => {
  let receivedUserIdFromSocket;
  try {
    if (isUserClicked) {
      dispatch({
        type: ADD_ACCEPTED_USER_REQUEST,
      });
      socket.emit('userAccepted', userId, (error) => {
        if (error) {
          dispatch({
            type: ADD_ACCEPTED_USER_FAIL,
            payload: error,
          });
          dispatch(
            popupMessage({
              type: 'error',
              content: error,
            })
          );
        }
      });
    } else {
      socket.on(
        'addUserAcceptedToPost',
        ({ lastUserAccepted, userId: receivedUserId }) => {
          receivedUserIdFromSocket = receivedUserId;
          dispatch({
            type: ADD_ACCEPTED_USER_SUCCESS,
            payload: {lastUserAccepted,userId},
          });
          if (userId === receivedUserId) {
            dispatch(
              popupMessage({
                type: 'success',
                content: 'You successfully agreed to participate',
              })
            );
          }
        }
      );
    }
  } catch (error) {
    if (userId === receivedUserIdFromSocket) {
      dispatch({
        type: ADD_ACCEPTED_USER_FAIL,
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
              : 'failed to accept the post',
        })
      );
    }
  }
};
// export const addAcceptedUser = (postId) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ADD_ACCEPTED_USER_REQUEST,
//     });
//     const {
//       userLogin: { userInfo },
//     } = getState();
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + userInfo.token,
//       },
//     };
//     const { data } = await axios.put(
//       BaseUrl + '/api/posts/add-accepted-user',
//       { postId: postId },
//       config
//     );

//     dispatch({
//       type: ADD_ACCEPTED_USER_SUCCESS,
//       payload: data,
//     });
//     dispatch(
//       popupMessage({
//         type: 'success',
//         content: 'You successfully agreed to participate',
//       })
//     );
//   } catch (error) {
//     dispatch({
//       type: ADD_ACCEPTED_USER_FAIL,
//       payload:
//         error.response && error.response.data && error.response.data.error
//           ? error.response.data.error
//           : 'something went wrong Please try again later',
//     });
//     dispatch(
//       popupMessage({
//         type: 'error',
//         content:
//           error.response && error.response.data && error.response.data.error
//             ? error.response.data.error
//             : 'failed to accept the post',
//       })
//     );
//   }
// };

export const deletePost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_POST_REQUEST,
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

    const { data } = await axios.delete(
      BaseUrl + '/api/posts/delete-post/' + postId,
      config
    );

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: postId,
    });
    dispatch(
      popupMessage({
        type: 'success',
        content: "You're Post successfully deleted",
      })
    );
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
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
            : 'failed to delete your post',
      })
    );
  }
};

export const markPostAsCompleted = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MARK_POST_AS_COMPLETED_REQUEST,
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
      BaseUrl + '/api/posts/mark-post-as-completed/' + postId,
      {},
      config
    );

    dispatch({
      type: MARK_POST_AS_COMPLETED_SUCCESS,
      payload: postId,
    });
    dispatch(
      popupMessage({
        type: 'success',
        content: "You're Post successfully marked as completed",
      })
    );
  } catch (error) {
    dispatch({
      type: MARK_POST_AS_COMPLETED_FAIL,
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
            : 'failed to mark post as completed',
      })
    );
  }
};

export const getUserPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_POSTS_REQUEST,
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
      BaseUrl + '/api/posts/get-user-posts',
      config
    );

    dispatch({
      type: GET_USER_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_POSTS_FAIL,
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
            : 'failed to get posts',
      })
    );
  }
};

export const getAllPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_POSTS_REQUEST,
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
      BaseUrl + '/api/posts/get-all-posts',
      config
    );

    dispatch({
      type: GET_ALL_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_POSTS_FAIL,
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
            : 'failed to get posts',
      })
    );
  }
};
export const getPost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_POST_REQUEST,
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
      BaseUrl + '/api/posts/get-post/' + postId,
      config
    );

    dispatch({
      type: GET_POST_SUCCESS,
      payload: {
        post: data.post,
        checkIfUserAccepted: data.checkIfUserAccepted,
      },
    });
  } catch (error) {
    
    dispatch({
      type: GET_POST_FAIL,
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
            : 'failed to get post',
      })
    );
  }
};

export const addPost = (
  title,
  description,
  payment,
  price,
  postImage,
  numOfPeopleNeeded,
  region,
  address,
  date
) => async (dispatch, getState) => {
  try {
    let formData = new FormData(); //formdata object
    formData.append('title', title); //append the values with
    formData.append('description', description);
    formData.append('payment', payment === 'payment' ? true : false);
    formData.append('price', price);
    formData.append('postImage', postImage);
    formData.append('numOfPeopleNeeded', numOfPeopleNeeded);
    formData.append('region', region);
    formData.append('address', address);
    formData.append('date', date);

    dispatch({
      type: ADD_POST_REQUEST,
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
    const { data } = await axios.post(
      BaseUrl + '/api/posts/create-post',
      formData,
      config
    );

    dispatch({
      type: ADD_POST_SUCCESS,
      // payload: data,
    });

    dispatch(
      popupMessage({
        type: 'success',
        content: "You're Post was successfully added",
      })
    );
  } catch (error) {
    dispatch({
      type: ADD_POST_FAIL,
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
            : 'failed to add your post',
      })
    );
  }
};


