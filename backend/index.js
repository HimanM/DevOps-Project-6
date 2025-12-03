const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Backend!', timestamp: new Date() });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`);
});
