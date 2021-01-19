const express = require('express');
const router = express.Router();
const {
  getOrCreateAuthUserProfile,
  updateProfile,
  createProfileReview,
  updateProfilePreferences,
  getAllProfiles
  // getAuthUser,
  // resetPassword,
  // forgotPassword,
  // googleLogin,
  // facebookLogin
} = require('../controllers/profile-controller');
const {
  profileDescriptionValidator,
  profileLocationValidator,
  profileAddReviewValidator
} = require('../validators/profile');
const { runValidation } = require('../validators');
const authMiddleware = require('../middleware/auth-middleware');


router.get('/get-profile/:id', authMiddleware, getOrCreateAuthUserProfile);
router.get('/profiles', authMiddleware, getAllProfiles);
router.put(
  '/update-profile',
  authMiddleware,
  updateProfile
);
router.put(
  '/update-profile-preferences',
  authMiddleware,
  updateProfilePreferences
);
router.put(
  '/add-profile-review',
  authMiddleware,
  profileAddReviewValidator,
  runValidation,
  createProfileReview
);

module.exports = router;
