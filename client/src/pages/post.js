import React from 'react';
import Post from '../components/post/Post';

export default function PostPage({ match }) {
  return (
    <>
      <Post match={match} />
    </>
  );
}
