import React from 'react';
import { FaCheck, FaTimesCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import {  useSelector } from 'react-redux';
import { MessageContainer } from './style';
const PopupMessage = () => {
  const popupMessageState = useSelector((state) => state.popupMessage);
  const { message } = popupMessageState;
  return (
    <>
      {message && (
        <IconContext.Provider value={{ size: '40px' }}>
          <MessageContainer error={message.type === 'error' && message.content}>
            {message.type === 'error' ? <FaTimesCircle /> : <FaCheck />}{' '}
            <span style={{ marginRight: '10px' }}></span>
            {message.content}
          </MessageContainer>
        </IconContext.Provider>
      )}
    </>
  );
};

export default PopupMessage;
