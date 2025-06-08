# Telegram Subscription Bot

Telegram Subscription Bot позволяет оформлять подписки на товары через платформу Zenky и хранит данные в PostgreSQL.

## Возможности
- Авторизация пользователей по Telegram ID
- Получение списка товаров из Zenky API
- Оформление подписки и проверка статуса заказа
- Хранение данных в PostgreSQL
- CI/CD через GitHub Actions и Render

## Технологии
- **Node.js** + **Express**
- **PostgreSQL**
- **Telegram Bot API** через `node-telegram-bot-api`
- **Jest** + **Supertest** для тестов

## Переменные окружения
Используются секреты из GitHub и локальные `.env` файлы:
- `BOT_TOKEN`
- `DATABASE_URL`
- `ZENKY_TOKEN`
- `X_STORE_ID`
- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`

Пример конфигурации находится в `.env.example` и `.env.test.example`.

## Структура проекта
```
subscription-bot/
├── bot/                    # Telegram bot logic
│   └── bot.js
├── src/
│   ├── db/                 # DB setup logic
│   │   └── index.js
│   └── main.js             # Entry point (Express server)
├── __tests__/              # Jest test suite
│   ├── bot.test.js
│   └── db.test.js
├── .env.example
├── .env.test.example
├── package.json
├── README.md
```

## Установка и запуск
```bash
npm install
npm start
```

## Тестирование
```bash
npm run test
# или
npm run test:ci
```
Отчёт о покрытии кода сохраняется в директорию `coverage/`.

## CI/CD
- Каждый push в `main` запускает тесты и деплой на Render
- Настройки находятся в `.github/workflows/test.yml` и `.github/workflows/deploy.yml`

## Примечания
Для локальной работы создайте файл `.env` по образцу `.env.example`.
Обратную связь и предложения оставляйте через [issues](https://github.com/danielmadtwinz/subscription-bot/issues).
