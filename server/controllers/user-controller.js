const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const Post = require('../models/postModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const fetch = require('node-fetch');
const { OAuth2Client } = require('google-auth-library');
const { sendEmailWithNodemailer } = require('../helpers/nodemailer');
const generateToken = require('../helpers/generateToken');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: 'Email already taken',
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '10m' }
    );

    const emailData = {
      from: 'ronnizan01@gmail.com',
      to: email,
      subject: 'ACCOUNT ACTIVATION LINK',
      html: `<p>Please use the following link to activate your account</p>
                <a href="${process.env.CLIENT_URL}/auth/activate/${token}" target="_blank">${process.env.CLIENT_URL}/auth/activate/${token}</a>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>`,
    };
    sendEmailWithNodemailer(req, res, emailData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 'Something went wrong, please try again later.',
    });
  }
};

const accountActivation = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      async function (err, decoded) {
        if (err) {
          console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
          return res.status(401).json({
            error: 'Expired link. Signup again',
          });
        }

        const { name, email, password } = jwt.decode(token);

        const user = new User({ name, email, password });
        await user.save();
        res.json({
          message: 'Signup success. Please signin.',
        });
      }
    );
  } else {
    return res.json({
      error: 'Something went wrong. Try again.',
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({
        error: 'Invalid email or password.',
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 'Something went wrong. Try again.',
    });
  }
};

const getAuthUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (user) {
      res.json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage,
        id: user.id,
      });
    } else {
      return res.status(401).json({
        error: 'failed to authenticate.',
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 'Something went wrong. Try again.',
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: 'User with that email does not exist',
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: '10m',
    });
    const emailData = {
      from: 'ronnizan01@gmail.com',
      to: email,
      subject: 'Password Reset link',
      html: `<p>Please use the following link to reset your password</p>
                <a href="${process.env.CLIENT_URL}/auth/password/reset/${token}" target="_blank">${process.env.CLIENT_URL}/auth/password/reset/${token}</a>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>`,
    };
    sendEmailWithNodemailer(req, res, emailData);
  } catch (error) {
    return res.status(400).json({
      error: 'Something went wrong. Please Try again.',
    });
  }
};

const resetPassword = (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({
        error: 'Something went wrong. Please Try again.',
      });
    }
    jwt.verify(token, process.env.JWT_RESET_PASSWORD, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          error: 'Expired link. Try again',
        });
      }
      const { _id } = jwt.decode(token);
      const user = await User.findOne({ _id });
      if (!user) {
        return res.status(400).json({
          error: 'User not found. Please Try later',
        });
      }
      user.password = newPassword;
      await user.save();
      res.json({
        message: `Great! you can login with your new password`,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: 'Something went wrong. Please Try again.',
    });
  }
};
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      // console.log('GOOGLE LOGIN RESPONSE',response)
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            //   expiresIn: '7d',
            // });

            const { _id, email, name, isAdmin } = user;
            return res.json({
              token: generateToken(user._id),
              id: _id,
              email,
              name,
              isAdmin,
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with google',
                });
              }
              // const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
              //   expiresIn: '7d',
              // });
              const { _id, email, name, isAdmin } = data;
              return res.json({
                token: generateToken(user._id),
                id: _id,
                email,
                name,
                isAdmin,
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Google login failed. Try again',
        });
      }
    });
};

const facebookLogin = (req, res) => {
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      // .then(response => console.log(response))
      .then((response) => {
        const { email, name } = response;
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            //   expiresIn: '7d',
            // });
            const { _id, email, name, isAdmin } = user;
            return res.json({
              token: generateToken(user._id),
              id: _id,
              email,
              name,
              isAdmin,
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with facebook',
                });
              }
              // const token = jwt.sign(
              //   { _id: data._id },
              //   process.env.JWT_SECRET,
              //   { expiresIn: '7d' }
              // );
              const { _id, email, name, isAdmin } = data;
              return res.json({
                token: generateToken(user._id),
                id: _id,
                email,
                name,
                isAdmin,
              });
            });
          }
        });
      })
      .catch((error) => {
        res.json({
          error: 'Facebook login failed. Try later',
        });
      })
  );
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.userId });
    const profile = await Profile.findOneAndRemove({ user: req.userId });
    const postsToRemove = await Post.deleteMany({ profile: profile._id });
    if (!user) {
      return res.status(401).json({
        error: 'no user found.',
      });
    }
    if (!profile) {
      return res.status(401).json({
        error: 'no profile found.',
      });
    }
    const imageName = profile.profileImage.split('/images/')[1];
    fs.unlink('../server/images/' + imageName, (err) => {
      if (err) {
        return res.json({ msg: 'failed to delete image' });
      } else {
        res.status(200).json({
          message: 'Your account has been successfully deleted.',
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Something went wrong. Try again.',
    });
  }
};

module.exports = {
  signup,
  accountActivation,
  signIn,
  getAuthUser,
  forgotPassword,
  resetPassword,
  googleLogin,
  facebookLogin,
  deleteUser,
};
