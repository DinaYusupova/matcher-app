const map = new Map();
const { Chat, User } = require('../db/models');

const connectionCB = (socket, req) => {
  const userId = req.session.user.id;
  map.set(userId, { ws: socket, user: req.session.user });
  socket.on('error', console.error);
  // console.log(map.get(1).ws);

  console.log('socket opened');
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
    console.log('проверка пейлоада и типа websocket server', payload, type, userId);
    switch (type) {
      case 'NEW_MESSAGE':
        Chat.create({
          senderId: userId,
          recipientId: 2,
          message: payload,
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
          // console.log(map);
          map.forEach(({ ws, user }) => {
            ws.send(
              JSON.stringify({
                type: 'ADD_MESSAGE',
                payload: messWithAuth,
              }),
            );
          });
        });
        break;

      default:
        break;
    }
  });

  socket.on('close', () => {
    console.log('socket close');
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
