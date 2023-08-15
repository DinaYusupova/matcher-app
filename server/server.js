const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createServer } = require('http');
const authRouter = require('./routes/authRouter');
const { upgradeCB, wsServer } = require('./websocket/wsServer');

const ProfileRouter = require('./routes/ProfileRouter');
const messageRouter = require('./routes/messageRouter');
const connectionCB = require('./websocket/connection');
const locationRouter = require('./routes/locationRouter');
const sessionParser = require('./middlewares/sessionParser');
const LikeDislikeRouter = require('./routes/likeDislikeRouter');

const UserPhotoRouter = require('./routes/account/userPhotoRouter');
const UserAccountRouter = require('./routes/account/userAccountRouter');

require('dotenv').config();

const app = express();
app.use(sessionParser);
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);

server.on('upgrade', upgradeCB);
wsServer.on('connection', connectionCB);
app.use('/api/auth', authRouter);
app.use('/api/profile', ProfileRouter);
app.use('/api', LikeDislikeRouter);
app.use('/api/chat', messageRouter);
app.use('/api/save-location', locationRouter);
app.use('/api/userphoto', UserPhotoRouter);
app.use('/api/account', UserAccountRouter);

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
