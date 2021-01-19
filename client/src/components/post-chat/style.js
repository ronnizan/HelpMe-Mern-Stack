import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { RiWechatFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdSend } from 'react-icons/io';

export const Chat = styled.form`
  background: lightgrey;
  border-radius: 10px;
  z-index: 10000;
  position: fixed;
  bottom: 110px;
  right: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.9);
  height: 310px;
  overflow-y: scroll;
  width: 290px;
  ::-webkit-scrollbar {
    display: none;
  }
  display: ${({ chatOpen }) => (chatOpen ? 'block' : 'none')};
`;
export const ChatTopRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-height:60px;
  background: lightblue;
  z-index: 10000;
  position: sticky;
  top: 0;
`;
export const ChatTopRowText = styled.div`
  font-size: 1.1rem;
  position: absolute;
  top: 10px;
`;
export const ChatUserTyping = styled.div`
  font-size: 0.9rem;
  color:grey;
  bottom: 10px;
  position: absolute;

`;
export const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
`;
export const ChatRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({ isThisUserMessage }) =>
    isThisUserMessage ? 'row' : 'row-reverse'};
  margin: 5px;
`;
export const ChatCommentDate = styled.span`
  position: absolute;
  font-size: 12px;
  color: grey;
  right: 5px;
  top: 0;
  font-family: cursive;
`;
export const ChatSelfUserContent = styled.p`
  background-color: #dcf8c6;
  padding: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  position: relative;
  ::before {
    content: '◀';
    color: #dcf8c6;
    position: absolute;
    top: 50%;
    left: -12px;
  }
`;
export const ChatOtherUserContent = styled.p`
  background-color: white;
  padding: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  position: relative;
  ::before {
    content: '▶';
    color: white;
    position: absolute;
    top: 50%;
    right: -11px;
  }
`;

export const ProfileImageLinkWrapper = styled(LinkR)`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  :hover {
    transform: scale(1.03);
  }
`;
export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: ${({ isThisUserMessage }) =>
    isThisUserMessage ? '10px' : '0'};
  margin-left: ${({ isThisUserMessage }) => (isThisUserMessage ? '0' : '10px')};
  @media screen and (max-width: 750px) {
    width: 50px;
    height: 50px;
  }
`;

export const ChatInputAndButton = styled.div`
  display: flex;
  background-color: white;
  outline: none;
  font-size: 1rem;
  position: sticky;
  bottom: 0;
  border-top: 2px solid black;
  z-index: 10000;
`;
export const ChatInput = styled.input`
  width: 85%;
  background-color: white;
  padding: 10px;
  outline: none;
  font-size: 1.3rem;
  bottom: 0;
  border: none;
`;
export const ChatSendBtnWrapper = styled.button`
  background: transparent;
  border: none;
  outline: none;
`;
export const ChatSendBtn = styled(IoMdSend)`
  cursor: pointer;
  height: 49px;
  width: 50px;
  &:hover {
    color: green;
  }
`;

export const OpenChatBtn = styled(RiWechatFill)`
  display: flex;
  position: fixed;
  bottom: 20px;
  right: 20px;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: green;
  background-color: lightblue;
  border-radius: 50%;
  padding: 10px;
  font-size: 4.5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;
export const CloseChatBtn = styled(AiOutlineClose)`
  display: flex;
  position: fixed;
  bottom: 20px;
  right: 20px;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: green;
  background-color: lightblue;
  border-radius: 50%;
  padding: 10px;
  font-size: 4.5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;
