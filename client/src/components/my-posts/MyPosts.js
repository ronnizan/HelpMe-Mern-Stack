import React, { useEffect } from 'react';
import moment from 'moment';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../loader/Loader';

import { IconContext } from 'react-icons/lib';
import {
  PostsContainer,
  PostCard,
  PostCardTopRow,
  PostCardBottomRow,
  PostCardBoxDate,
  PostCardVMark,
  ReadMoreBtn,
  MarkAsCompletedBtn,
  PostCardXMark,
  PostCardTitle,
} from './style';
import {
  deletePost,
  getUserPosts,
  markPostAsCompleted,
} from '../../redux/actions/postActions';

const MyPosts = () => {
  const userState = useSelector((state) => state.userLogin);
  const { userInfo } = userState;
  const getUserPostsState = useSelector((state) => state.getUserPosts);
  const { loading, posts } = getUserPostsState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);
  return (
    <PostsContainer>
      {posts && posts.length === 0 && (
        <PostCardTitle>No Posts Yet!</PostCardTitle>
      )}
      {loading && <Loader />}
      {posts &&
        posts.map((post) => (
          <PostCard
            isDatePassed={new Date().getTime() > new Date(post.date).getTime()}
            isCompleted={post.completed}
            key={post._id}
          >
            <PostCardTopRow>
              {userInfo.id === post.profile.user && (
                <IconContext.Provider value={{ color: 'red' }}>
                  <PostCardXMark
                    onClick={() => {
                      dispatch(deletePost(post._id));
                    }}
                    title='Delete Post'
                  ></PostCardXMark>
                </IconContext.Provider>
              )}
              <PostCardBoxDate>
                {moment(post.createdAt).fromNow()}
              </PostCardBoxDate>
            </PostCardTopRow>
            <PostCardBottomRow>
              <PostCardTitle>{post.title}</PostCardTitle>
            </PostCardBottomRow>
            <PostCardBottomRow>
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
                      completed!
                    </PostCardTitle>
                  </IconContext.Provider>
                </>
              ) : null}
            </PostCardBottomRow>
            {!post.completed && (
              <PostCardBottomRow>
                <MarkAsCompletedBtn
                  onClick={() => {
                    dispatch(markPostAsCompleted(post._id));
                  }}
                >
                  Mark as completed
                </MarkAsCompletedBtn>
              </PostCardBottomRow>
            )}
            {
              <PostCardBottomRow>
                <ReadMoreBtn to={'/post/' + post._id}>
                  <span>
                    More Info <AiOutlineDoubleRight></AiOutlineDoubleRight>
                  </span>
                </ReadMoreBtn>
              </PostCardBottomRow>
            }
          </PostCard>
        ))}
    </PostsContainer>
  );
};
export default MyPosts;
