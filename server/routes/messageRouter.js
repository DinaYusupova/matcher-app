const express = require('express');
const { Op } = require('sequelize');

const { Chat, Like, User, Profile, sequelize } = require('../db/models');

const messageRouter = express.Router();
messageRouter.post('/:chat', async (req, res) => {
  try {
    console.log('asdsadsadasd!', req.params.chat);
    const data = await Chat.findAll({
      where: {
        [Op.or]: [
          { senderId: req.session.user.id, recipientId: req.params.chat },
          { senderId: req.params.chat, recipientId: req.session.user.id },
        ],
      },
    });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
messageRouter.post('/find/matched', async (req, res) => {
  try {
    const avChats = await Chat.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [{ senderId: req.session.user.id }, { recipientId: req.session.user.id }],
          },
          {
            message: {
              [Op.eq]: null,
            },
          },
        ],
      },
      include: {
        model: User,
        as: 'sender',
        attributes: ['id', 'email'],
        include: ['profile', 'photo'],
      },
    });
    const test = JSON.parse(JSON.stringify(avChats));
    res.status(200).json(avChats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while fetching empty messages' });
  }
});

module.exports = messageRouter;
