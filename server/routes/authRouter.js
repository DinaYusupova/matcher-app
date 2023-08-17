const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const authRouter = express.Router();
authRouter.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.status(400).json({ message: 'необходимо заполнить все поля' });
    }
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: await bcrypt.hash(password, 10),
      },
    });
    if (!isCreated) {
      return res.status(403).json({ message: 'уже зареган' });
    }
    const userSession = JSON.parse(JSON.stringify(user));
    delete userSession.password;
    req.session.user = userSession;

    return res.json(userSession);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
authRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.status(400).json({ message: 'необходимо заполнить все поля' });
    }
    const user = await User.findOne({
      where: { email },
    });
    if (!user) return res.status(401).json({ message: 'no such user' });
    if (!(await bcrypt.compare(password, user.password))) {
      console.log('no pass');
      return res.status(401).json({ message: 'wrong pass' });
    }
    const userSession = JSON.parse(JSON.stringify(user));

    console.log('=========>', userSession);
    delete userSession.password;
    req.session.user = userSession;
    return res.json(userSession);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
authRouter.get('/logout', async (req, res) => {
  req.session.destroy();
  return res.clearCookie('sid').sendStatus(200);
});
authRouter.post('/check', async (req, res) => {
  if (req.session.user) {
    return res.status(200).json(req.session.user);
  }
  return res.sendStatus(401);
});
module.exports = authRouter;
