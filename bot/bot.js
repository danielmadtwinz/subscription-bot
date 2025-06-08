const TelegramBot = require('node-telegram-bot-api');
let bot;

function initializeBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error('TELEGRAM_BOT_TOKEN is not set');
    return;
  }
  bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to Subscription Bot!');
  });
}

module.exports = { initializeBot, bot };
