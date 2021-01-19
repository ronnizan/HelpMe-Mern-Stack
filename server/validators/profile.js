const { check } = require('express-validator');

const profileDescriptionValidator = [
  check('description').not().isEmpty().withMessage('description is required'),
];

const profileLocationValidator = [
  check('location').not().isEmpty().withMessage('location is required'),

];
const profileAddReviewValidator = [
  check('profileId').not().isEmpty().withMessage('profile Id is required'),
  check('rating').not().isEmpty().withMessage('rating is required'),
];
module.exports = {
  profileDescriptionValidator,
  profileLocationValidator,
  profileAddReviewValidator
};
