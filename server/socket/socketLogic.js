require('dotenv').config();
const Post = require('../models/postModel');
const Profile = require('../models/profileModel');
const {
  addUserToChat,
  removeUserFromChat,
  getUserFromChat,
  getUsersInChat,
} = require('./postChatRoom');
const sendSms = require('../helpers/vonageSms');

function activateSocket(listener) {
  const io = require('socket.io')(listener, {
    cors: {
      origin: '*',
    },
    transport: ['websocket'],
  });
  io.on('connect', (socket) => {
    socket.on('join', ({ room }, callback) => {
      const { error, user } = addUserToChat({ id: socket.id, room });
      if (error) return callback(error);
      socket.join(user.room);
      callback();
    });      
    socket.on('sendMessage', async (userId, content, callback) => {
      try {
        const user = getUserFromChat(socket.id);
        const selfProfile = await Profile.findOne({ user: userId });
        const post = await Post.findById(user.room);
        const comment = {
          profile: selfProfile._id,
          content,
        };
        post.comments.push(comment);
        await post.save();
        const updatedPost = await Post.findById(user.room).populate(
          'profile usersAccepted.profile comments.profile'
        );
        const lastComment =
          updatedPost.comments[updatedPost.comments.length - 1];
        io.to(user.room).emit('addLastCommentToPost', { lastComment, userId });

        callback();
      } catch (error) {
        callback('err!!');
      }
    });
    socket.on('userAccepted', async (userId, callback) => {
      try {
        const user = getUserFromChat(socket.id);
        const selfProfile = await Profile.findOne({ user: userId }).populate(
          'user reviews.profile'
        );
        const post = await Post.findById(user.room).populate(
          'profile usersAccepted.profile comments.profile'
        );
        const checkIfUserAccepted = post.usersAccepted.find(
          (usersAccepted) =>
            usersAccepted.profile.user.toString() === userId.toString()
        );
        if (checkIfUserAccepted) {
          return callback('you already accepted the post');
        }
        const checkIfAllUsersAcceptedStillExist = post.usersAccepted.findIndex(
          (usersAccepted) => usersAccepted.profile === null
        );
        if (checkIfAllUsersAcceptedStillExist !== -1) {
          post.usersAccepted.splice(checkIfAllUsersAcceptedStillExist, 1);
        }
        post.usersAccepted.push({
          profile: selfProfile._id,
          username: selfProfile.user.name,
        });
        await post.save();
        const updatedPost = await Post.findById(user.room).populate(
          'profile usersAccepted.profile comments.profile'
        );
        const lastUserAccepted =
          updatedPost.usersAccepted[updatedPost.usersAccepted.length - 1];

        io.to(user.room).emit('addUserAcceptedToPost', {
          lastUserAccepted,
          userId,
        });
        if (
          post.profile.preferences.sendSmsOnPostPeopleNeededReached && updatedPost.numOfPeopleNeeded  === updatedPost.usersAccepted.length
        ) {
          const phoneNumber =
            post.profile.preferences.areaCode +
            post.profile.preferences.phoneNumber;
          const userAcceptedName = selfProfile.user.name;
          const postId = updatedPost._id; 
          
          sendSms(phoneNumber,userAcceptedName,postId,post.profile.preferences.sendSmsOnPostPeopleNeededReached);
        }
        if (
          post.profile.preferences.sendSmsOnUserAcceptPost && !post.profile.preferences.sendSmsOnPostPeopleNeededReached 
        ) {
          const phoneNumber =
            post.profile.preferences.areaCode +
            post.profile.preferences.phoneNumber;
          const userAcceptedName = selfProfile.user.name;
          const postId = updatedPost._id; 
          sendSms(phoneNumber,userAcceptedName,postId);
        }
        callback();
      } catch (error) {
        console.error(error);
        callback('Something went wrong, please try again later.');
      }
    });

    socket.on('removeAcceptedUser', async (userId, callback) => {
      try {
        const user = getUserFromChat(socket.id);

        const post = await Post.findById(user.room).populate(
          'profile usersAccepted.profile comments.profile'
        );
        const usersAcceptedIndex = post.usersAccepted.findIndex(
          (usersAccepted) =>
            usersAccepted.profile?.user.toString() === userId.toString()
        );

        if (usersAcceptedIndex === -1) {
          return callback("you didn't accepted the post");
        }
        const checkIfAllUsersAcceptedStillExist = post.usersAccepted.findIndex(
          (usersAccepted) => usersAccepted.profile === null
        );
        if (checkIfAllUsersAcceptedStillExist !== -1) {
          post.usersAccepted.splice(checkIfAllUsersAcceptedStillExist, 1);
        }
        post.usersAccepted.splice(usersAcceptedIndex, 1);
        await post.save();
        io.to(user.room).emit('removeAcceptedUserFromPost', { userId });

        callback();
      } catch (error) {
        console.error(error);
        callback('Something went wrong, please try again later.');
      }
    });

    socket.on('userTyping', (isChatUserTyping, name) => {
      try {
        const user = getUserFromChat(socket.id);
        socket.broadcast
          .to(user.room)
          .emit('isChatUserTyping', isChatUserTyping, isChatUserTyping && name);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
      const user = removeUserFromChat(socket.id);
    });
  });
}
module.exports = activateSocket;
