const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionParser = session({
  name: 'sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});
module.exports = sessionParser;
