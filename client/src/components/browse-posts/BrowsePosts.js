import React, { useState, useEffect } from 'react';
import moment from 'moment';
import AnonymousUser from '../../images/icons/user.png';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../loader/Loader';
import { IconContext } from 'react-icons/lib';
import {
  BrowsePostsContainer,
  BrowsePostsTitle,
  PostsContainer,
  PostsContainerTopRow,
  PostSelectContainer,
  SelectRegionLabel,
  SelectRegion,
  PostCard,
  PostCardTopRow,
  PostCardBottomRow,
  PostCardBoxDate,
  ReadMoreBtn,
  PostCardImageAndName,
  PostCardImage,
  PostCardName,
  PostCardVMark,
  PostCardLabel,
  PostCardXMark,
  PostCardTitle,
} from './style';
import { getAllPosts } from '../../redux/actions/postActions';

const BrowsePosts = () => {
  const [region, setRegion] = useState('all');
  const [showOnlyActivePosts, setShowOnlyActivePosts] = useState(false);
  const getAllPostsState = useSelector((state) => state.getAllPosts);
  const { loading, posts } = getAllPostsState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>
      <BrowsePostsContainer>
        <BrowsePostsTitle>Posts</BrowsePostsTitle>
        <PostsContainerTopRow>
          <PostSelectContainer>
            <SelectRegionLabel>Select Region:</SelectRegionLabel>
            <SelectRegion
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
              }}
            >
              <option value={'all'}>All</option>
              <option value={'North Region'}>North Region</option>
              <option value={'Center Region'}>Center Region</option>
              <option value={'South Region'}>South Region</option>
            </SelectRegion>{' '}
          </PostSelectContainer>
          <PostSelectContainer>
            <SelectRegionLabel>Show Only Active Posts:</SelectRegionLabel>
            <input
              onChange={(e) => setShowOnlyActivePosts(e.target.checked)}
              type='checkbox'
            ></input>
          </PostSelectContainer>
        </PostsContainerTopRow>

        {loading && <Loader></Loader>}
        <PostsContainer>
          {posts &&
            !showOnlyActivePosts &&
            posts.map((post) =>
              region === 'all' ? (
                <PostCard
                  isDatePassed={
                    new Date().getTime() > new Date(post.date).getTime()
                  }
                  isCompleted={post.completed}
                  key={post._id}
                >
                  <PostCardTopRow>
                    <PostCardImageAndName
                      to={'/profile/' + post.profile?.user}
                      title={post.name}
                    >
                      <PostCardImage
                        src={post.profile?.profileImage || AnonymousUser}
                      ></PostCardImage>
                      <PostCardName>{post.name}</PostCardName>
                    </PostCardImageAndName>
                    <PostCardBoxDate>
                      {moment(post.createdAt).fromNow()}
                    </PostCardBoxDate>
                  </PostCardTopRow>
                  <PostCardTitle>{post.title}</PostCardTitle>
                  {post.date && (
                    <PostCardBottomRow>
                      <PostCardLabel></PostCardLabel>
                      {moment(post.date).format('dddd, MMMM Do YYYY, h:mm a')}
                    </PostCardBottomRow>
                  )}
                  <PostCardBottomRow>
                    <PostCardLabel>Type :</PostCardLabel>&nbsp;{' '}
                    {post.payment ? 'With Payment' : 'Volunteering'}
                  </PostCardBottomRow>
                  <PostCardBottomRow>
                    <PostCardLabel>Region:</PostCardLabel>&nbsp; {post.region}
                  </PostCardBottomRow>
                  <PostCardBottomRow>
                    <PostCardLabel>Address:</PostCardLabel>&nbsp; {post.address}
                  </PostCardBottomRow>
                  <PostCardBottomRow>
                    {post.date &&
                    new Date().getTime() > new Date(post.date).getTime() ? (
                      <>
                        <IconContext.Provider value={{ color: 'red' }}>
                          <PostCardTitle>
                            <PostCardXMark></PostCardXMark> This post date has
                            passed!
                          </PostCardTitle>
                        </IconContext.Provider>
                      </>
                    ) : post.completed ? (
                      <>
                        <IconContext.Provider value={{ color: 'green' }}>
                          <PostCardTitle>
                            <PostCardVMark></PostCardVMark> This post has marked
                            as completed!
                          </PostCardTitle>
                        </IconContext.Provider>
                      </>
                    ) : null}
                  </PostCardBottomRow>
                  <PostCardBottomRow>
                    <ReadMoreBtn to={'/post/' + post._id}>
                      <span>
                        More Info <AiOutlineDoubleRight></AiOutlineDoubleRight>
                      </span>
                    </ReadMoreBtn>
                  </PostCardBottomRow>
                </PostCard>
              ) : (
                post.region === region && (
                  <PostCard
                    isDatePassed={
                      new Date().getTime() > new Date(post.date).getTime()
                    }
                    isCompleted={post.completed}
                    key={post._id}
                  >
                    <PostCardTopRow>
                      <PostCardImageAndName
                        to={'/profile/' + post.profile?.user}
                        title={post.name}
                      >
                        <PostCardImage
                          src={post.profile?.profileImage || AnonymousUser}
                        ></PostCardImage>
                        <PostCardName>{post.name}</PostCardName>
                      </PostCardImageAndName>
                      <PostCardBoxDate>
                        {moment(post.createdAt).fromNow()}
                      </PostCardBoxDate>
                    </PostCardTopRow>
                    <PostCardTitle>{post.title}</PostCardTitle>
                    {post.date && (
                      <PostCardBottomRow>
                        <PostCardLabel></PostCardLabel>
                        {moment(post.date).format('dddd, MMMM Do YYYY, h:mm a')}
                      </PostCardBottomRow>
                    )}
                    <PostCardBottomRow>
                      <PostCardLabel>Type :</PostCardLabel>&nbsp;{' '}
                      {post.payment ? 'With Payment' : 'Volunteering'}
                    </PostCardBottomRow>
                    <PostCardBottomRow>
                      <PostCardLabel>Region:</PostCardLabel>&nbsp; {post.region}
                    </PostCardBottomRow>
                    <PostCardBottomRow>
                      <PostCardLabel>Address:</PostCardLabel>&nbsp;{' '}
                      {post.address}
                    </PostCardBottomRow>
                    <PostCardBottomRow>
                      {post.date &&
                      new Date().getTime() > new Date(post.date).getTime() ? (
                        <>
                          <IconContext.Provider value={{ color: 'red' }}>
                            <PostCardTitle>
                              <PostCardXMark></PostCardXMark> This post date has
                              passed!
                            </PostCardTitle>
                          </IconContext.Provider>
                        </>
                      ) : post.completed ? (
                        <>
                          <IconContext.Provider value={{ color: 'green' }}>
                            <PostCardTitle>
                              <PostCardVMark></PostCardVMark> This post has
                              marked as completed!
                            </PostCardTitle>
                          </IconContext.Provider>
                        </>
                      ) : null}
                    </PostCardBottomRow>
                    <PostCardBottomRow>
                      <ReadMoreBtn to={'/post/' + post._id}>
                        <span>
                          More Info{' '}
                          <AiOutlineDoubleRight></AiOutlineDoubleRight>
                        </span>
                      </ReadMoreBtn>
                    </PostCardBottomRow>
                  </PostCard>
                )
              )
            )}
          {/* only active posts: date is still in the future and not marked as completed*/}
          {posts &&
            showOnlyActivePosts &&
            posts.map((post) =>
              post.isActive ? (
                region === 'all' ? (
                  <PostCard
                    isDatePassed={
                      new Date().getTime() > new Date(post.date).getTime()
                    }
                    isCompleted={post.completed}
                    key={post._id}
                  >
                    <PostCardTopRow>
                      <PostCardImageAndName
                        to={'/profile/' + post.profile?.user}
                        title={post.name}
                      >
                        <PostCardImage
                          src={post.profile?.profileImage || AnonymousUser}
                        ></PostCardImage>
                        <PostCardName>{post.name}</PostCardName>
                      </PostCardImageAndName>
                      <PostCardBoxDate>
                        {moment(post.createdAt).fromNow()}
                      </PostCardBoxDate>
                    </PostCardTopRow>
                    <PostCardTitle>{post.title}</PostCardTitle>
                    {post.date && (
                      <PostCardBottomRow>
                        <PostCardLabel></PostCardLabel>
                        {moment(post.date).format('dddd, MMMM Do YYYY, h:mm a')}
                      </PostCardBottomRow>
                    )}
                    <PostCardBottomRow>
                      <PostCardLabel>Type :</PostCardLabel>&nbsp;{' '}
                      {post.payment ? 'With Payment' : 'Volunteering'}
                    </PostCardBottomRow>
                    <PostCardBottomRow>
                      <PostCardLabel>Region:</PostCardLabel>&nbsp; {post.region}
                    </PostCardBottomRow>
                    <PostCardBottomRow>
                      <PostCardLabel>Address:</PostCardLabel>&nbsp;{' '}
                      {post.address}
                    </PostCardBottomRow>
                    <PostCardBottomRow>
                      {post.date &&
                      new Date().getTime() > new Date(post.date).getTime() ? (
                        <>
                          <IconContext.Provider value={{ color: 'red' }}>
                            <PostCardTitle>
                              <PostCardXMark></PostCardXMark> This post date has
                              passed!
                            </PostCardTitle>
                          </IconContext.Provider>
                        </>
                      ) : post.completed ? (
                        <>
                          <IconContext.Provider value={{ color: 'green' }}>
                            <PostCardTitle>
                              <PostCardVMark></PostCardVMark> This post has
                              marked as completed!
                            </PostCardTitle>
                          </IconContext.Provider>
                        </>
                      ) : null}
                    </PostCardBottomRow>
                    <PostCardBottomRow>
                      <ReadMoreBtn to={'/post/' + post._id}>
                        <span>
                          More Info{' '}
                          <AiOutlineDoubleRight></AiOutlineDoubleRight>
                        </span>
                      </ReadMoreBtn>
                    </PostCardBottomRow>
                  </PostCard>
                ) : (
                  post.region === region && (
                    <PostCard
                      isDatePassed={
                        new Date().getTime() > new Date(post.date).getTime()
                      }
                      isCompleted={post.completed}
                      key={post._id}
                    >
                      <PostCardTopRow>
                        <PostCardImageAndName
                          to={'/profile/' + post.profile?.user}
                          title={post.name}
                        >
                          <PostCardImage
                            src={post.profile?.profileImage || AnonymousUser}
                          ></PostCardImage>
                          <PostCardName>{post.name}</PostCardName>
                        </PostCardImageAndName>
                        <PostCardBoxDate>
                          {moment(post.createdAt).fromNow()}
                        </PostCardBoxDate>
                      </PostCardTopRow>
                      <PostCardTitle>{post.title}</PostCardTitle>
                      {post.date && (
                        <PostCardBottomRow>
                          <PostCardLabel></PostCardLabel>
                          {moment(post.date).format(
                            'dddd, MMMM Do YYYY, h:mm a'
                          )}
                        </PostCardBottomRow>
                      )}
                      <PostCardBottomRow>
                        <PostCardLabel>Type :</PostCardLabel>&nbsp;{' '}
                        {post.payment ? 'With Payment' : 'Volunteering'}
                      </PostCardBottomRow>
                      <PostCardBottomRow>
                        <PostCardLabel>Region:</PostCardLabel>&nbsp;{' '}
                        {post.region}
                      </PostCardBottomRow>
                      <PostCardBottomRow>
                        <PostCardLabel>Address:</PostCardLabel>&nbsp;{' '}
                        {post.address}
                      </PostCardBottomRow>
                      <PostCardBottomRow>
                        {post.date &&
                        new Date().getTime() > new Date(post.date).getTime() ? (
                          <>
                            <IconContext.Provider value={{ color: 'red' }}>
                              <PostCardTitle>
                                <PostCardXMark></PostCardXMark> This post date
                                has passed!
                              </PostCardTitle>
                            </IconContext.Provider>
                          </>
                        ) : post.completed ? (
                          <>
                            <IconContext.Provider value={{ color: 'green' }}>
                              <PostCardTitle>
                                <PostCardVMark></PostCardVMark> This post has
                                marked as completed!
                              </PostCardTitle>
                            </IconContext.Provider>
                          </>
                        ) : null}
                      </PostCardBottomRow>
                      <PostCardBottomRow>
                        <ReadMoreBtn to={'/post/' + post._id}>
                          <span>
                            More Info{' '}
                            <AiOutlineDoubleRight></AiOutlineDoubleRight>
                          </span>
                        </ReadMoreBtn>
                      </PostCardBottomRow>
                    </PostCard>
                  )
                )
              ) : null
            )}
        </PostsContainer>
      </BrowsePostsContainer>
    </>
  );
};
export default BrowsePosts;
