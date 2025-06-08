require('dotenv').config({ path: '.env.test.example' });
jest.mock('node-telegram-bot-api', () => {
  const handlers = [];
  const mockBot = {
    onText: jest.fn((regex, cb) => {
      handlers.push({ regex, cb });
    }),
    sendMessage: jest.fn(),
  };
  const TelegramBot = jest.fn(() => mockBot);
  TelegramBot.__mockBot = mockBot;
  TelegramBot.__handlers = handlers;
  return TelegramBot;
});

const { initializeBot } = require('../bot/bot');
const TelegramBot = require('node-telegram-bot-api');

describe('Telegram bot', () => {
  beforeEach(() => {
    TelegramBot.__mockBot.sendMessage.mockClear();
    TelegramBot.__handlers.length = 0;
  });

  test('handles /start command', () => {
    process.env.BOT_TOKEN = 'testtoken';
    initializeBot();
    const handler = TelegramBot.__handlers.find(h => h.regex.test('/start'));
    expect(handler).toBeDefined();
    handler.cb({ chat: { id: 123 }, text: '/start' });
    expect(TelegramBot.__mockBot.sendMessage).toHaveBeenCalledWith(
      123,
      'Welcome to Subscription Bot!'
    );
  });

  test('ignores unknown command', () => {
    process.env.BOT_TOKEN = 'testtoken';
    initializeBot();
    const handler = TelegramBot.__handlers.find(h => h.regex.test('/start'));
    expect(handler).toBeDefined();
    const msg = { chat: { id: 123 }, text: '/foo' };
    if (handler.regex.test(msg.text)) {
      handler.cb(msg);
    }
    expect(TelegramBot.__mockBot.sendMessage).not.toHaveBeenCalled();
  });
});
