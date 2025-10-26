const express = require('express');
const axios = require('axios');
const { Command } = require('commander');
const NodeCache = require('node-cache');

const program = new Command();
const app = express();

const cache = new NodeCache({ stdTTL: 3600 });

program
  .option('--port <number>', 'Port to run the proxy server', '3000')
  .option('--origin <url>', 'Origin server URL')
  .option('--clear-cache', 'Clear the cache');

program.parse(process.argv);
const options = program.opts();

if (options.clearCache) {
  cache.flushAll();
  console.log('Cache cleared successfully!');
  process.exit(0);
}

if (!options.origin || !options.port) {
  console.error('Please specify an origin server using --origin <url> and a port using --port <number>');
  process.exit(1);
}

const ORIGIN = options.origin;
const PORT = options.port;

app.use(async (req, res) => {
  const url = `${ORIGIN}${req.originalUrl}`;

  if (cache.has(url)) {
    console.log(`Serving from cache: ${url}`);
    const cached = cache.get(url);
    res.setHeader('X-Cache', 'HIT');
    return res.status(cached.status).set(cached.headers).send(cached.data);
  }

  try {
    console.log(`Fetching from origin: ${url}`);
    const response = await axios.get(url, { validateStatus: () => true });
    cache.set(url, {
      data: response.data,
      headers: response.headers,
      status: response.status,
    });

    res.setHeader('X-Cache', 'MISS');
    res.status(response.status).set(response.headers).send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch from origin' });
  }
});

app.listen(PORT, () => {
  console.log(`Caching proxy running on http://localhost:${PORT}`);
  console.log(`Forwarding requests to: ${ORIGIN}`);
});
