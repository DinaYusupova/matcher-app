// const { Op } = require('sequelize');
// const {
//   DialogueUserStatus,
//   Dialogue,
// } = require('../db/models');

// module.exports = async function checkTimer(sessionId, reqbodyId) {
//   const currentDialogue = await Dialogue.findOne({
//     where: {
//       [Op.or]: [
//         {
//           buddyOne: sessionId,
//           buddyTwo: reqbodyId,
//         },
//         {
//           buddyOne: reqbodyId,
//           buddyTwo: sessionId,
//         },
//       ],
//     },
//   });
//   console.log(currentDialogue, 'currentDIALOGUE MESSAGE ROUTER!!!!!!!!!!!!!!!!!!!!!!!!!');
//   const [statusData, isCreated] = await DialogueUserStatus.findOrCreate({
//     where: {
//       dialogueId: currentDialogue.dataValues.id,
//       userId: sessionId,
//     },
//     defaults: {
//       status: true,
//     },
//   });

//   console.log(statusData);
//   const continueChat = await DialogueUserStatus.findAll({
//     where: {
//       dialogueId: currentDialogue.dataValues.id,
//       status: true,
//     },
//   });
//   if (continueChat.length === 2) {
//     return true;
//   }
//   return false;
// };
