const express = require('express');
const app = express();
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const counter = new client.Counter({
  name: 'app_requests_total',
  help: 'Total number of requests',
});

app.get('/', (req, res) => {
  counter.inc();
  res.send('Hello from Node.js with Prometheus metrics!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

