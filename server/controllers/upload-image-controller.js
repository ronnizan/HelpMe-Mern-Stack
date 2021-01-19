const Profile = require('../models/profileModel');
const Post = require('../models/postModel');
const fs = require('fs');

const uploadUserImage = async (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    const profile = await Profile.findOneAndUpdate(
      { user: req.userId },
      { profileImage: url + '/images/' + req.file.filename }
    );
    if (profile.profileImage) {
      const imageName = profile.profileImage.split('/images/')[1];
      fs.unlink('../server/images/' + imageName, async (err) => {
        if (err) {
          return res.json({ error: 'failed to delete image' });
        } else {
          // res.status(200).json({
          //   message: 'Your account has been successfully deleted.',
          // });
          await profile.save();
          return res.status(201).json(url + '/images/' + req.file.filename);
        }
      });
    } else {
      await profile.save();
      return res.status(201).json(url + '/images/' + req.file.filename);
    }
  } catch (error) {
    res.status(400).json({ error: 'server error' });
  }
};


module.exports = {
  uploadUserImage
};
