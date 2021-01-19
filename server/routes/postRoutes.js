const express = require('express');
const multer = require('multer');

const router = express.Router();
const {
  createPost,
  getAllPosts,
  getUserPosts,
  deletePost,
  markPostAsCompleted,
  getPost,
  addUserToAcceptedUsersArray,
  removeUserFromAcceptedUsersArray
} = require('../controllers/post-controller');
const {storage } = require('../helpers/multerStorage')
const { createPostValidator } = require('../validators/post');
const { runValidation } = require('../validators');
const authMiddleware = require('../middleware/auth-middleware');

router.post(
  '/create-post',
  authMiddleware,
  multer({ storage: storage }).single('postImage'),
  createPostValidator,
  runValidation,
  createPost
);
router.get(
  '/get-all-posts',
  authMiddleware,
  getAllPosts
);
router.get(
  '/get-user-posts',
  authMiddleware,
  getUserPosts
);
router.get(
  '/get-post/:postId',
  authMiddleware,
  getPost
);
router.put(
  '/mark-post-as-completed/:postId',
  authMiddleware,
  markPostAsCompleted
);
router.put(
  '/add-accepted-user',
  authMiddleware,
  addUserToAcceptedUsersArray
);

router.delete(
  '/remove-accepted-user/:postId',
  authMiddleware,
  removeUserFromAcceptedUsersArray
);

router.delete(
  '/delete-post/:postId',
  authMiddleware,
  deletePost
);


module.exports = router;
