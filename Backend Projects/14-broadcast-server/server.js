const ws = require('ws');
const wss = new ws.Server({ port: 8000 });

console.log('Broadcast server running on ws://localhost:8000');

wss.on('connection', (ws) => {
  ws.isAlive = true;
  console.log('Client connected');
  ws.on('pong', () => (ws.isAlive = true));

  ws.on('message', (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch {
      console.log('Invalid message received');
      return;
    }

    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });

    if (data.type === 'join') {
      ws.username = data.from;
    }
  });

  ws.on('close', () => {
    if (ws.username) {
      const msg = JSON.stringify({
        type: 'system',
        text: `${ws.username} left the chat`,
        from: 'system',
      });

      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(msg);
        }
      });
    }
    console.log('Client disconnected');
  });
});

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);
