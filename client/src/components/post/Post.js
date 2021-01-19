import React, { useEffect, useState } from 'react';
import moment from 'moment';
import AnonymousUser from '../../images/icons/user.png';
import { useHistory } from 'react-router-dom';
import { FaWaze } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../loader/Loader';
import io from 'socket.io-client';
import { IconContext } from 'react-icons/lib';
import {
  PostsContainer,
  PostCard,
  PostCardTopRow,
  PostCardRow,
  PostCarUserAcceptedRow,
  PostCardDescription,
  PostGoogleMap,
  WazeLink,
  PostCardBoxDate,
  PostCardVMark,
  PostCardImageAndName,
  PostCardProfileImage,
  PostCardImage,
  PostCardName,
  AcceptBtn,
  PostCardXMark,
  PostCardTitle,
} from './style';
import {
  addAcceptedUserWithSocketListener,
  removeAcceptedUserWithSocketListener,
  getPost,
} from '../../redux/actions/postActions';
import PostChat from '../post-chat/PostChat';
import { BaseUrl } from '../../redux/constants/endPoints';
import { GET_POST_RESET } from '../../redux/constants/postConstants';
let socket;
const Post = ({ match }) => {
  const history = useHistory();
  const userState = useSelector((state) => state.userLogin);
  const { userInfo } = userState;
  const getPostState = useSelector((state) => state.getPost);
  const {
    loading,
    post,
    error:getPostError,
    checkIfUserAccepted = false,
  } = getPostState;
  const removeAcceptedUserState = useSelector(
    (state) => state.removeAcceptedUser
  );
  const { loading: removeAcceptedUserLoading } = removeAcceptedUserState;
  const addAcceptedUserState = useSelector((state) => state.addAcceptedUser);
  const { loading: addAcceptedUserLoading } = addAcceptedUserState;
  const [isUserClickedAccept, setIsUserClickedAccept] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const postId = match.params.postId;
    dispatch(getPost(postId));
    socket = io(BaseUrl);
    socket.emit('join', { room: postId }, (error) => {
      if (error) {
        alert(error);
      }
    });
    dispatch(addAcceptedUserWithSocketListener(socket, userInfo.id, false));
    dispatch(removeAcceptedUserWithSocketListener(socket, userInfo.id, false));
    return () => {
      socket.disconnect();
    };
  }, [dispatch, match.params.postId, userInfo?.id]);

  useEffect(() => {
    if (getPostError) {
      history.push('/');
      dispatch({ type: GET_POST_RESET });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPostError]);

  return (
    <PostsContainer>
      {loading && <Loader />}
      {/* {!loading  && !post && <Redirect to='/'></Redirect>} */}
      {post && (
        <PostCard
          isDatePassed={new Date().getTime() > new Date(post.date).getTime()}
          isCompleted={post.completed}
          // key={post._id}
        >
          <PostCardTopRow>
            <PostCardImageAndName
              to={'/profile/' + post.profile.user}
              title={post.name}
            >
              <PostCardProfileImage
                src={post.profile.profileImage || AnonymousUser}
              ></PostCardProfileImage>
              <PostCardName>{post.name}</PostCardName>
            </PostCardImageAndName>
            <PostCardBoxDate>
              {moment(post.createdAt).fromNow()}
            </PostCardBoxDate>
          </PostCardTopRow>
          <PostCardRow>
            <PostCardTitle>{post.title}</PostCardTitle>
          </PostCardRow>
          <PostCardRow>
            <PostCardDescription>{post.description}</PostCardDescription>
          </PostCardRow>
          <PostCardRow>
            <PostCardDescription>{post.region}</PostCardDescription>
          </PostCardRow>
          <PostCardRow>
            <PostCardDescription>
              {post.address} &nbsp;
              <WazeLink
                title='Navigate with Waze'
                href={'https://waze.com/ul?q=' + post.address}
              >
                <FaWaze></FaWaze>
              </WazeLink>
            </PostCardDescription>
          </PostCardRow>
          <PostCardRow>
            <PostGoogleMap
              title='map'
              src={
                'https://maps.google.com/maps?q=' +
                post.address +
                '&t=&z=17&ie=UTF8&iwloc=&output=embed'
              }
            ></PostGoogleMap>
          </PostCardRow>
          <PostCardDescription>
            People Needed: {post.numOfPeopleNeeded}
          </PostCardDescription>

          <PostCardRow></PostCardRow>
          {post.payment ? (
            <PostCardRow>
              <PostCardDescription>{post.price}₪</PostCardDescription>
            </PostCardRow>
          ) : (
            <PostCardRow>
              <PostCardDescription>Volunteering</PostCardDescription>
            </PostCardRow>
          )}
          {post.postImage && (
            <PostCardRow>
              <PostCardImage src={post?.postImage}></PostCardImage>
            </PostCardRow>
          )}
          {post.isActive &&
          !checkIfUserAccepted &&
          !isUserClickedAccept && 
          !post.completed &&
          post.usersAccepted.length < post.numOfPeopleNeeded ? (
            <AcceptBtn
              disabled={removeAcceptedUserLoading || addAcceptedUserLoading}
              onClick={() => {
                // dispatch(addAcceptedUser(post._id));
                dispatch(
                  addAcceptedUserWithSocketListener(socket, userInfo.id, true)
                );
                setIsUserClickedAccept(true);
              }}
            >
              Accept
            </AcceptBtn>
          ) : null}
          {checkIfUserAccepted || isUserClickedAccept && !post.completed ? (
            <AcceptBtn
              disabled={removeAcceptedUserLoading || addAcceptedUserLoading}
              onClick={() => {
                dispatch(
                  removeAcceptedUserWithSocketListener(
                    socket,
                    userInfo.id,
                    true
                  )
                );
                setIsUserClickedAccept(false);
              }}
            >
              Cancel Participation
            </AcceptBtn>
          ) : null}
          {post.usersAccepted.length === post.numOfPeopleNeeded && (
            <PostCardRow>
              <PostCardTitle>People Needed Expectation Meeted! </PostCardTitle>
            </PostCardRow>
          )}
          {post.usersAccepted && post.usersAccepted.length > 0 && (
            <>
              <br />
              <PostCardDescription>Users Accepted:</PostCardDescription>
              <PostCarUserAcceptedRow>
                {post.usersAccepted.map((usersAccepted) => (
                  <PostCardImageAndName
                    key={usersAccepted.profile?.user}
                    to={'/profile/' + usersAccepted.profile?.user}
                  >
                    <PostCardProfileImage
                      title={usersAccepted.username}
                      src={usersAccepted.profile?.profileImage || AnonymousUser}
                    ></PostCardProfileImage>
                  </PostCardImageAndName>
                ))}
              </PostCarUserAcceptedRow>
            </>
          )}

          <PostCardRow>
            {post.date &&
            new Date().getTime() > new Date(post.date).getTime() ? (
              <>
                <IconContext.Provider value={{ color: 'red' }}>
                  <PostCardTitle>
                    <PostCardXMark></PostCardXMark> This post date has passed!
                  </PostCardTitle>
                </IconContext.Provider>
              </>
            ) : post.completed ? (
              <>
                <IconContext.Provider value={{ color: 'green' }}>
                  <PostCardTitle>
                    <PostCardVMark></PostCardVMark>
                    This post has marked as completed!
                  </PostCardTitle>
                </IconContext.Provider>
              </>
            ) : null} 
            {/* {!post.date && post.completed && (
              <>
                <IconContext.Provider value={{ color: 'green' }}>
                  <PostCardTitle>
                    <PostCardVMark></PostCardVMark>
                    This post has marked as completed!
                  </PostCardTitle>
                </IconContext.Provider>
              </>
            )} */}
          </PostCardRow>
        </PostCard>
      )}
      {post && socket && <PostChat post={post} socket={socket} />}
    </PostsContainer>
  );
};
export default Post;
