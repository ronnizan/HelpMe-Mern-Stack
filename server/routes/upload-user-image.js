const express = require('express');
const multer = require('multer');
const {storage } = require('../helpers/multerStorage')
const authMiddleware = require('../middleware/auth-middleware');
const {
  uploadUserImage,
} = require('../controllers/upload-image-controller');
const router = express.Router();

router.post(
  '/',
  authMiddleware,
  multer({ storage: storage }).single('image'),
  uploadUserImage
);

module.exports = router;
