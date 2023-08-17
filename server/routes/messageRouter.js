const express = require('express');
const { Op } = require('sequelize');
const { scheduledJobs } = require('./likeDislikeRouter');
const {
  Chat,
  Like,
  User,
  Profile,
  sequelize,
  DialogueUserStatus,
  Dialogue,
} = require('../db/models');
const checkTimer = require('../utils/checkTimer');

const messageRouter = express.Router();
messageRouter.post('/:chat', async (req, res) => {
  try {
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
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'email'],
          include: ['profile', 'photo'],
        },
        {
          model: User,
          as: 'recipient',
          attributes: ['id', 'email'],
          include: ['profile', 'photo'],
        },
      ],
    });
    return res.status(200).json(avChats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error occurred while fetching empty messages' });
  }
});

module.exports = messageRouter;
