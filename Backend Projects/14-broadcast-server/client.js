const WebSocket = require('ws');
const readline = require('readline');

const URL = 'ws://localhost:8000';
const USERNAME = process.argv[2] || 'Anonymous';

const ws = new WebSocket(URL);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

ws.on('open', () => {
  console.log('Connected! Type messages:');

  ws.send(JSON.stringify({ type: 'join', from: USERNAME }));

  rl.on('line', (text) => {
    const msg = { type: 'message', text, from: USERNAME };
    ws.send(JSON.stringify(msg));
  });
});

ws.on('message', (data) => {
  const msg = JSON.parse(data);
    if (msg.type === 'system') {
    console.log(`*** ${msg.text} ***`);
  } else {
    console.log(`${msg.from}: ${msg.text}`);
  }
});

ws.on('close', () => {
  console.log('Disconnected from server');
  process.exit(0);
});
