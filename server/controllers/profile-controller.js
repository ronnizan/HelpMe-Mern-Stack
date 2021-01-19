const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;

const getOrCreateAuthUserProfile = async (req, res) => {
  try {
    const user = req.params.id;
    checkObjectIdValidity = (id) =>
      ObjectId.isValid(id)
        ? String(new ObjectId(id) === id)
          ? true
          : false
        : false;
    const isObjectIdValid = checkObjectIdValidity(user);
    if (!isObjectIdValid) {
      return res.status(400).json({
        error: 'No Profile found',
      });
    }
    const profile = await Profile.findOne({ user }).populate(
      'user reviews.profile'
    );
    //to update profile image, if user changed his profile image since his review
    if (!profile) {
      const isUserExist = await User.findById(user);
      if (!isUserExist) {
        return res.status(400).json({
          error: 'No Profile found',
        });
      }
      const profile = new Profile({ user }).populate('user reviews.profile');
      await profile.save();
      return res.json(profile);
    }
    profile.reviews.map(async (review) => {
      const profile = await Profile.find({ user: review.user });
      review.reviewerProfileImage = profile[0]?.profileImage;
    });

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Something went wrong, please try again later.',
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { region, description, reset } = req.body;
    const user = req.userId;
    const profile = await Profile.findOne({ user }).populate(
      'user reviews.profile'
    );
    if (region) {
      profile.region = region;
      await profile.save();
    }
    if (description) {
      profile.description = description;
      await profile.save();
    }
    if (reset) {
      profile.description = '';
      profile.region = '';
      if (profile.profileImage) {
        const imageName = profile.profileImage.split('/images/')[1];
        fs.unlink('../server/images/' + imageName, async (err) => {
          if (err) {
            // return res.json({ error: 'failed to delete image' });
          } else {
            console.log('ads');
          }
        });
      }
      profile.profileImage = '';
      await profile.save();
    }
    if (!profile) {
      return res.status(400).json({
        error: 'No Profile found',
      });
    }
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Something went wrong, please try again later.',
    });
  }
};
const updateProfilePreferences = async (req, res) => {
  try {
    const {
      sendSmsOnPostPeopleNeededReached,
      sendSmsOnUserAcceptPost,
      phoneNumber,
      areaCode,
    } = req.body;
    const user = req.userId;
    const profile = await Profile.findOne({ user }).populate(
      'user reviews.profile'
    );

    profile.preferences.sendSmsOnPostPeopleNeededReached = sendSmsOnPostPeopleNeededReached;
    profile.preferences.sendSmsOnUserAcceptPost = sendSmsOnUserAcceptPost;
    profile.preferences.phoneNumber = phoneNumber;
    profile.preferences.areaCode = areaCode;

    if (!sendSmsOnPostPeopleNeededReached && !sendSmsOnUserAcceptPost) {
      profile.preferences.phoneNumber = '';
      profile.preferences.areaCode = '';
    }
  
    // console.log(profile.preferences);
    await profile.save();
    if (!profile) {
      return res.status(400).json({
        error: 'No Profile found',
      });
    }

    res.json(profile);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Something went wrong, please try again later.',
    });
  }
};

const createProfileReview = async (req, res) => {
  const { rating, comment, profileId } = req.body;
  const selfProfile = await Profile.findOne({ user: req.userId }).populate(
    'user reviews.profile'
  );
  // const reviewerProfileImage = selfProfile.profileImage;
  if (selfProfile._id.toString() === profileId) {
    return res.status(400).json({
      error: 'you cannot review yourself :).',
    });
  }
  const profile = await Profile.findById(profileId).populate(
    'user reviews.profile'
  );

  if (profile) {
    const alreadyReviewed = profile.reviews.find(
      (r) => r.user.toString() === req.userId.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        error: 'you already submitted your review.',
      });
    }

    const review = {
      name: selfProfile.user.name,
      rating: Number(rating),
      comment,
      user: req.userId,
      profile: selfProfile._id,
    };

    profile.reviews.unshift(review);

    profile.numReviews = profile.reviews.length;

    profile.rating =
      profile.reviews.reduce((acc, item) => item.rating + acc, 0) /
      profile.reviews.length;

    await profile.save();
    const updatedProfile = await Profile.findById(profileId).populate(
      'user reviews.profile'
    );
    res.status(201).json(updatedProfile);
  } else {
    return res.status(400).json({
      error: 'failed to add review.',
    });
  }
};
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate('user reviews.profile');
    if (!profiles) {
      return res.status(400).json({
        error: 'no profiles found.',
      });
    } else {
      res.json(profiles);
    }
  } catch (error) {
    return res.status(400).json({
      error: 'failed to get profiles',
    });
  }
};

module.exports = {
  getOrCreateAuthUserProfile,
  updateProfile,
  createProfileReview,
  updateProfilePreferences,
  getAllProfiles,
};
