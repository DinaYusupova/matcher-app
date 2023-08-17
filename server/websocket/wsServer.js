const { WebSocketServer } = require('ws');
const sessionParser = require('../middlewares/sessionParser');

const wsServer = new WebSocketServer({ clientTracking: true, noServer: true });

const upgradeCB = (req, socket, header) => {
  socket.on('error', (err) => console.log(`Socket error: ${err}`));
  sessionParser(req, {}, () => {
    if (!req.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\n\n');
      return socket.destroy();
    }
    socket.removeListener('error', (err) => console.log(`socket error ${err}`));
    wsServer.handleUpgrade(req, socket, header, (ws) => {
      wsServer.emit('connection', ws, req);
    });
  });
};
module.exports = { wsServer, upgradeCB };
