const users = [];

const addUserToChat = ({ id,room }) => {
  room = room.trim().toLowerCase();

  if( !room) return { error: 'room Is required.' };

  const user = { id, room };

  users.push(user);

  return { user };
}

const removeUserFromChat = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}
       
const getUserFromChat = (id) => users.find((user) => user.id === id);

const getUsersInChat = (room) => users.filter((user) => user.room === room);

module.exports = { addUserToChat, removeUserFromChat, getUserFromChat, getUsersInChat }; 