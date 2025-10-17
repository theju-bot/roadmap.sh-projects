const redis = require('redis');
const client = redis.createClient({
  socket: { host: '127.0.0.1', port: 6379 },
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await client.connect();
})();

module.exports = client;
