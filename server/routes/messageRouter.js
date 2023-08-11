const express = require('express');
const { Op } = require('sequelize');
const { Chat, User, sequelize } = require('../db/models');

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

module.exports = messageRouter;
