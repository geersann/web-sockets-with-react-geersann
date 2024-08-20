const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 });

wss.on('connection', function connection(ws) {
  console.log('New client connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    const textMessage = Buffer.isBuffer(message) ? message.toString() : message;

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(textMessage);
      }
    });
  });

  ws.send('Welcome to the WebSocket server!');
});

module.exports = wss;
