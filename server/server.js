const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createServer } = require('http');
const { upgradeCB, wsServer } = require('./websocket/wsServer');
const sessionParser = require('./middlewares/sessionParser');

const ProfileRouter = require('./routes/ProfileRouter');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionParser);

const server = createServer(app);

server.on('upgrade', upgradeCB);
// wsServer.on('connection', connectionCB);
// app.use('/api/user', userRouter);
app.use('/api/profile', ProfileRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
