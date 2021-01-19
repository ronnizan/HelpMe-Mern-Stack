import React from 'react';
import Profile from '../components/profile/Profile';

export default function ProfilePage({ match }) {
  return (
    <>
      <Profile match={match} />
    </>
  );
}
