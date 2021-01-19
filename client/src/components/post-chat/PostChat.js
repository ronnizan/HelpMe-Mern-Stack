import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
import 'react-datepicker/dist/react-datepicker.css';
import AnonymousUser from '../../images/icons/user.png';
import {
  OpenChatBtn,
  CloseChatBtn,
  Chat,
  ChatTopRow,
  ChatTopRowText,
  ChatUserTyping,
  ChatBody,
  ChatRow,
  ChatCommentDate,
  ChatSelfUserContent,
  ChatOtherUserContent,
  ProfileImageLinkWrapper,
  ProfileImage,
  ChatInputAndButton,
  ChatInput,
  ChatSendBtnWrapper,
  ChatSendBtn,
} from './style';
import {
  addCommentWithSocketListener,
} from '../../redux/actions/postActions';

const PostChat = ({ post, socket }) => {
  const userState = useSelector((state) => state.userLogin);
  const { userInfo } = userState;
  const [content, setContent] = useState('');
  const [chatUserTypingTimeOut, setChatUserTypingTimeOut] = useState(undefined);
  const [isChatUserTyping, setIsChatUserTyping] = useState(false);
  const [userNameTyping, setUserNameTyping] = useState('');
  const [firstVisitToThePage, setFirstVisitToThePage] = useState(0);
  const addCommentState = useSelector((state) => state.addComment);
  const { loading: addCommentLoading, lastComment } = addCommentState;
  const [chatOpen, setChatOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (firstVisitToThePage !== 0) {
      scroll.scrollToBottom({
        containerId: 'myScrollToContainer',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastComment]);

  useEffect(() => {
    //activate socket listener for messages 
    dispatch(addCommentWithSocketListener(socket));
    socket.on('isChatUserTyping', (isChatUserTyping, name) => {
      setIsChatUserTyping(isChatUserTyping);
      if (name) {
        setUserNameTyping(name);
      } else {
        setUserNameTyping('');
      }
    });

    setFirstVisitToThePage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const submitMessage = (e) => {
    e.preventDefault();
    if (!content) {
      return;
    }
    dispatch(addCommentWithSocketListener(socket, userInfo.id, content));
    setContent('');
  };
  return (
    <>
      {post && (
        <>
          <Chat
            id='myScrollToContainer'
            onSubmit={submitMessage}
            chatOpen={chatOpen}
          >
            <ChatTopRow>
              <ChatTopRowText>{post.title} Discussion </ChatTopRowText>
              <ChatUserTyping>
                {isChatUserTyping ? userNameTyping + ' is typing...' : ''}
              </ChatUserTyping>
            </ChatTopRow>
            <ChatBody>
              {post &&
                post.comments &&
                post.comments.map((comment) => (
                  <ChatRow
                    isThisUserMessage={comment.profile?.user === userInfo.id}
                    key={comment._id}
                  >
                    <ProfileImageLinkWrapper
                      to={'/profile/' + comment.profile?.user}
                    >
                      <ProfileImage
                        isThisUserMessage={comment.profile?.user === userInfo.id}
                        src={comment.profile?.profileImage || AnonymousUser}
                      ></ProfileImage>
                    </ProfileImageLinkWrapper>
                    {comment.profile?.user === userInfo.id ? (
                      <ChatSelfUserContent>
                        {comment.content}
                        <ChatCommentDate>
                          {moment(comment.createdAt).format('HH:mm')}
                        </ChatCommentDate>
                      </ChatSelfUserContent>
                    ) : (
                      <ChatOtherUserContent>
                        {comment.content}
                        <ChatCommentDate>
                          {moment(comment.createdAt).format('HH:mm')}
                        </ChatCommentDate>
                      </ChatOtherUserContent>
                    )}
                  </ChatRow>
                ))}
              <div id='test'></div>
            </ChatBody>
            <ChatInputAndButton>
              <ChatInput
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                  socket.emit('userTyping', true, userInfo.name);
                  clearTimeout(chatUserTypingTimeOut);
                }}
                onKeyUp={(e) => {
                  setChatUserTypingTimeOut(
                    setTimeout(() => {
                      socket.emit('userTyping', false);
                    }, 1000)
                  );
                }}
              ></ChatInput>
              <ChatSendBtnWrapper disabled={addCommentLoading}>
                <ChatSendBtn></ChatSendBtn>
              </ChatSendBtnWrapper>
            </ChatInputAndButton>
          </Chat>
          {chatOpen ? (
            <CloseChatBtn
              onClick={() => setChatOpen(!chatOpen)}
            ></CloseChatBtn>
          ) : (
            <OpenChatBtn
              onClick={() => setChatOpen(!chatOpen)}
            ></OpenChatBtn>
          )}
        </>
      )}
    </>
  );
};
export default PostChat;
