const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const uploadUserImageRoute = require('./routes/upload-user-image');
const activateSocket = require('./socket/socketLogic');
const connectDb = require('./config/db');
require('dotenv').config();

connectDb();
const app = express();
app.use(express.json());

app.use(cors());
app.use('/images', express.static(path.join(__dirname, './images')));

app.use('/api/user', userRoutes);
app.use('/api/upload-user-image', uploadUserImageRoute);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);
  


const port = process.env.PORT || 8000;

const listener = app.listen(port, () =>
  console.log(`Example app listening on ${port} !`)
);
activateSocket(listener);
