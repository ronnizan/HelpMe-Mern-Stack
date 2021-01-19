import { SHOW_MESSAGE, RESET_MESSAGE } from '../constants/messageConstants.js';
export const popupMessage = ({ content, type }) => async (dispatch) => {
  dispatch({
    type: SHOW_MESSAGE,
    payload: { content, type },
  });

  setTimeout(() => {
    dispatch({ type: RESET_MESSAGE });
  }, 5000);
};
