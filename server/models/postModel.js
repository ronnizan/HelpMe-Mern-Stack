const mongoose = require('mongoose');
// const { profileSchema } = require('../models/profileModel');
const postSchema = mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
    // userImage: {
    //   type: String,
    // },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    numOfPeopleNeeded: {
      type: Number,
      required: true,
    },
    usersAccepted: [
      {
        profile: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Profile',
        },
        username: {
          type: String,
          required: true
        },
      },
    ],
    region: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
    },
    comments: [
      {
        profile: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Profile',
        },
        content: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
