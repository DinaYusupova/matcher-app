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
    const test = JSON.parse(JSON.stringify(avChats));
    res.status(200).json(avChats);
    

    return res.status(200).json(avChats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error occurred while fetching empty messages' });
  }
});
messageRouter.post('/check/timer', async (req, res) => {
  console.log(req.body);
  const currentDialogue = await Dialogue.findOne({
    where: {
      [Op.or]: [
        {
          buddyOne: req.session.user.id,
          buddyTwo: req.body.userId,
        },
        {
          buddyOne: req.body.userId,
          buddyTwo: req.session.user.id,
        },
      ],
    },
  });
  console.log(currentDialogue, 'currentDIALOGUE MESSAGE ROUTER!!!!!!!!!!!!!!!!!!!!!!!!!');
  const [statusData, isCreated] = await DialogueUserStatus.findOrCreate({
    where: {
      dialogueId: currentDialogue.dataValues.id,
      userId: req.session.user.id,
    },
    defaults: {
      status: true,
    },
  });

  console.log(statusData);
  const continueChat = await DialogueUserStatus.findAll({
    where: {
      dialogueId: currentDialogue.dataValues.id,
      status: true,
    },
  });
  if (continueChat.length === 2) {
    scheduledJobs[
      `${currentDialogue.dataValues.buddyOne}-${currentDialogue.dataValues.buddyTwo}`
    ].cancel();
    console.log('NO DELETE I SUPOSE');
  }
});
// messageRouter.get('/', async (req, res) => {
//   Like.findAll({
//     include: {
//       model: User,
//       as: 'likedBy', // Используйте правильный алиас
//       where: { likerId: req.session.user.id },
//     },
//   }).then((matchingUsers) => {
//     console.log('Пользователи с взаимными лайками:', matchingUsers);
//   });
// });

module.exports = messageRouter;
