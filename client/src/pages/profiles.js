import React from 'react';
import Profiles from '../components/profiles/Profiles';

export default function ProfilesPage({ match }) {
  return (
    <>
      <Profiles match={match} />
    </>
  );
}
