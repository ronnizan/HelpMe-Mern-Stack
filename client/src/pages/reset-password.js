import React from 'react';
import ResetPassword from '../components/reset-password/ResetPassword';
const ResetPasswordPage = ({ match }) => {
  return <ResetPassword token={match.params.token} />;
};

export default ResetPasswordPage;
