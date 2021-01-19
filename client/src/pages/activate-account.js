import React from 'react';
import ActivateAccount from '../components/activate-account/ActivateAccount';
const ActivateAccountPage = ({ match }) => {
  
  
  return <ActivateAccount token={match.params.token} />;
};

export default ActivateAccountPage;
