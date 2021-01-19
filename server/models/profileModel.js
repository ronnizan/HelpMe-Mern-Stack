const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  {
    timestamps: true,
  }
);

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  profileImage: {
    type: String,
    default: '',
  },
  region: {
    type: String,
    default: '',
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },

  description: {
    type: String,
    default: '',
  },
  preferences: {
    sendSmsOnPostPeopleNeededReached: {
      type: Boolean,
      default: false,
    },
    sendSmsOnUserAcceptPost: {
      type: Boolean,
      default: false,
    },
    areaCode: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
  },
});
const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
 