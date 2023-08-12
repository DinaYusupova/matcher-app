const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createServer } = require('http');
const { upgradeCB, wsServer } = require('./websocket/wsServer');
// const sessionParser = require('./middlewares/sessionParser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const ProfileRouter = require('./routes/ProfileRouter');
const authRouter = require('./routes/authRouter');
const messageRouter = require('./routes/messageRouter');
const connectionCB = require('./websocket/connection');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET ?? 'test',
    resave: true,
    store: new FileStore(),
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    },
  }),
);

const server = createServer(app);

server.on('upgrade', upgradeCB);
wsServer.on('connection', connectionCB);
// app.use('/api/user', userRouter);
app.use('/api/profile', ProfileRouter);
app.use('/api/auth', authRouter);
app.use('/api/chat', messageRouter);

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
