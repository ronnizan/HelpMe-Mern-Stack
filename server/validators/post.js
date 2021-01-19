const { check } = require('express-validator');

const createPostValidator = [
  check('title').not().isEmpty().withMessage('title is required'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('numOfPeopleNeeded')
    .not()
    .isEmpty()
    .withMessage('number of people needed is required'),
  check('region').not().isEmpty().withMessage('region is required'),
  check('address').not().isEmpty().withMessage('address is required'),
];

module.exports = {
  createPostValidator
};
