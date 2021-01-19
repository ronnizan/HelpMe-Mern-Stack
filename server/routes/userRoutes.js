const express = require('express');
const router = express.Router();
const {
  signup,
  accountActivation,
  signIn,
  getAuthUser,
  resetPassword,
  forgotPassword,
  googleLogin,
  facebookLogin,
  deleteUser
} = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', runValidation, signIn);
router.get('/get-user', authMiddleware, getAuthUser);
router.delete('/delete-account', authMiddleware, deleteUser);

router.post('/forgot-password', forgotPasswordValidator, runValidation,forgotPassword );
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);
router.post('/google-login', googleLogin);
router.post('/facebook-login', facebookLogin);

module.exports = router;
