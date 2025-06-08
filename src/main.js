require('dotenv').config();
const express = require('express');
const { initializeBot } = require('../bot/bot');
const { initDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Subscription Bot is running');
});

(async () => {
  await initDb();
  initializeBot();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
