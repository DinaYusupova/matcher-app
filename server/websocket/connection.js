const map = new Map();
const { Chat, User } = require('../db/models');

const connectionCB = (socket, req) => {
  const userId = req.session.user.id;
  map.set(userId, { ws: socket, user: req.session.user });
  socket.on('error', console.error);

  map.forEach(({ ws }) => {
    ws.send(
      JSON.stringify({
        type: 'SET_USERS',
        payload: [...map.values()].map(({ user }) => user),
      }),
    );
  });

  socket.on('message', async (message) => {
    const { type, payload } = JSON.parse(message);
    switch (type) {
      case 'NEW_MESSAGE':
        Chat.create({
          senderId: userId,
          recipientId: payload.chatId,
          message: payload.input,
        }).then(async (newMessage) => {
          const messWithAuth = await Chat.findOne({
            where: {
              id: newMessage.id,
            },
            include: [
              { model: User, as: 'sender' },
              { model: User, as: 'recipient' },
            ],
          });

          const { ws: sender } = map.get(userId);
          sender.send(
            JSON.stringify({
              type: 'ADD_MESSAGE',
              payload: messWithAuth,
            }),
          );
          if (map.get(payload.chatId)) {
            const { ws } = map.get(payload.chatId);
            ws.send(
              JSON.stringify({
                type: 'ADD_MESSAGE',
                payload: messWithAuth,
              }),
            );
          }
        });
        break;

      default:
        break;
    }
  });

  socket.on('close', () => {
    map.delete(userId);
    map.forEach(({ ws }) => {
      ws.send(
        JSON.stringify({
          type: 'SET_USERS',
          payload: [...map.values()].map(({ user }) => user),
        }),
      );
    });
  });
};
module.exports = connectionCB;
