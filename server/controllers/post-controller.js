const Post = require('../models/postModel');
const Profile = require('../models/profileModel');
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;

const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      payment,
      price,
      numOfPeopleNeeded,
      region,
      date,
      address,
    } = req.body;
    let postImage = req.body.postImage;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      postImage = url + '/images/' + req.file.filename;
    }
    const user = req.userId;
    const profile = await Profile.findOne({ user }).populate(
      'user reviews.profile'
    );
    const withPayment = payment === 'true' ? true : false;
    if (!profile) {
      return res.status(400).json({
        error: 'Something went wrong, please try again later.',
      });
    }
    if (withPayment && !price) {
      return res.status(400).json({
        error: 'Price is Needed when with payment option is selected.',
      });
    }
    if (withPayment && price < 0) {
      return res.status(400).json({
        error: "Price Can't be less than 0.",
      });
    }
    const post = new Post({
      profile: profile._id,
      // userImage: profile.profileImage,
      name: profile.user.name,
      title,
      description,
      payment: withPayment,
      price,
      date,
      numOfPeopleNeeded,
      region,
      address,
      postImage: postImage === 'null' ? null : postImage,
    });
    await post.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Something went wrong, please try again later.',
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('profile')
      .sort([['createdAt', -1]]);
    if (!posts) {
      return res.status(400).json({
        error: 'no posts found.',
      });
    } else {
      // check if each post is active
      posts.map((post) => {
        if (!post.date && !post.completed) {
          return post;
        }
        if (
          (post.date && new Date().getTime() > new Date(post.date).getTime()) ||
          post.completed
        ) {
          post.isActive = false;
          return post;
        }
      });

      res.json(posts);
    }
  } catch (error) {
    return res.status(400).json({
      error: 'failed to get posts',
    });
  }
};
const getUserPosts = async (req, res) => {
  try {
    const user = req.userId;
    const profile = await Profile.findOne({ user }).select('_id');
    const posts = await Post.find({ profile: profile._id })
      .select('_id completed isActive title date createdAt')
      .populate('profile')
      .sort([['createdAt', -1]]);
    if (!posts) {
      return res.status(400).json({
        error: 'no posts found.',
      });
    } else {
      // check if each post is active
      posts.map((post) => {
        if (!post.date && !post.completed) {
          return post;
        }
        if (
          (post.date && new Date().getTime() > new Date(post.date).getTime()) ||
          post.completed
        ) {
          post.isActive = false;
          return post;
        }
      });

      res.json(posts);
    }
  } catch (error) {
    return res.status(400).json({
      error: 'failed to get posts',
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    checkObjectIdValidity = (id) =>
      ObjectId.isValid(id)
        ? String(new ObjectId(id) === id)
          ? true
          : false
        : false;
    const isObjectIdValid = checkObjectIdValidity(postId);
    if (!isObjectIdValid) {
      return res.status(400).json({
        error: 'No Post found',
      });
    }
    const user = req.userId;
    const post = await Post.findById(postId).populate('profile');
    if (!post) {
      return res.status(400).json({
        error: 'No Post found',
      });
    }
    if (user !== post.profile.user.toString()) {
      return res.status(400).json({
        error: 'Not Authorized',
      });
    }
    if (post.postImage) {
      const imageName = post.postImage.split('/images/')[1];
      fs.unlink('../server/images/' + imageName, async (err) => {
        if (err) {
        } else {
        }
      });
    }
    await Post.deleteOne({ _id: postId });
    res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Something went wrong, please try again later.',
    });
  }
};

const markPostAsCompleted = async (req, res) => {
  try {
    const postId = req.params.postId;
    checkObjectIdValidity = (id) =>
      ObjectId.isValid(id)
        ? String(new ObjectId(id) === id)
          ? true
          : false
        : false;
    const isObjectIdValid = checkObjectIdValidity(postId);
    if (!isObjectIdValid) {
      return res.status(400).json({
        error: 'No Post found',
      });
    }
    const user = req.userId;
    const post = await Post.findById(postId).populate(
      'profile usersAccepted.profile'
    );
    if (!post) {
      return res.status(400).json({
        error: 'No Post found',
      });
    }
    if (user !== post.profile.user.toString()) {
      return res.status(400).json({
        error: 'Not Authorized',
      });
    }
    post.completed = true;

    await post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Something went wrong, please try again later.',
    });
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    checkObjectIdValidity = (id) =>
      ObjectId.isValid(id)
        ? String(new ObjectId(id) === id)
          ? true
          : false
        : false;
    const isObjectIdValid = checkObjectIdValidity(postId);
    if (!isObjectIdValid) {
      return res.status(400).json({
        error: 'No Post found',
      });
    }
    const post = await Post.findById(postId).populate(
      'profile usersAccepted.profile comments.profile'
    );
    if (!post) {
      return res.status(400).json({
        error: 'No Post found',
      });
    }

    const checkIfUserAccepted = post.usersAccepted.find(
      (usersAccepted) =>
        usersAccepted.profile?.user.toString() === req.userId.toString()
    );
    const checkIfAllUsersAcceptedStillExist = post.usersAccepted.findIndex(
      (usersAccepted) => usersAccepted.profile === null
    );
    if (checkIfAllUsersAcceptedStillExist !== -1) {
      post.usersAccepted.splice(checkIfAllUsersAcceptedStillExist, 1);
    }

    res.json({ post, checkIfUserAccepted: checkIfUserAccepted ? true : false });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Something went wrong, please try again later.',
    });
  }
};

const addUserToAcceptedUsersArray = async (req, res) => {
  const postId = req.body.postId;
  const selfProfile = await Profile.findOne({ user: req.userId }).populate(
    'user reviews.profile'
  );
  const post = await Post.findById(postId).populate(
    'profile usersAccepted.profile comments.profile'
  );
  if (post) {
    const checkIfUserAccepted = post.usersAccepted.find(
      (usersAccepted) =>
        usersAccepted.profile.user.toString() === req.userId.toString()
    );

    if (checkIfUserAccepted) {
      return res.status(400).json({
        error: 'you already accepted the post.',
      });
    }
    post.usersAccepted.push({
      profile: selfProfile._id,
      username: selfProfile.user.name,
    });

    await post.save();
    const updatedPost = await Post.findById(postId).populate(
      'profile usersAccepted.profile comments.profile'
    );
    const lastUserAccepted =
      updatedPost.usersAccepted[updatedPost.usersAccepted.length - 1];
    res.status(201).json(lastUserAccepted);
  } else {
    return res.status(400).json({
      error: 'failed to find post.',
    });
  }
};
const removeUserFromAcceptedUsersArray = async (req, res) => {
  const postId = req.params.postId;
  checkObjectIdValidity = (id) =>
    ObjectId.isValid(id)
      ? String(new ObjectId(id) === id)
        ? true
        : false
      : false;
  const isObjectIdValid = checkObjectIdValidity(postId);
  if (!isObjectIdValid) {
    return res.status(400).json({
      error: 'No Post found',
    });
  }
  const post = await Post.findById(postId).populate(
    'profile usersAccepted.profile comments.profile'
  );
  if (post) {
    const usersAcceptedIndex = post.usersAccepted.findIndex(
      (usersAccepted) =>
        usersAccepted.profile.user.toString() === req.userId.toString()
    );

    if (usersAcceptedIndex === -1) {
      return res.status(400).json({
        error: "you didn't accepted the post.",
      });
    }
    post.usersAccepted.splice(usersAcceptedIndex, 1);
    await post.save();
    res.status(201).json(req.userId);
  } else {
    return res.status(400).json({
      error: 'failed to find post.',
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getUserPosts,
  markPostAsCompleted,
  deletePost,
  getPost,
  addUserToAcceptedUsersArray,
  removeUserFromAcceptedUsersArray,
};
