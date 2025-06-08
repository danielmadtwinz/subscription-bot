require('dotenv').config({ path: '.env.test' });
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgres://postgres:secret@localhost:5432/subscription_db_test';
}
const { pool, initDb } = require('../src/db');

describe('Database connection', () => {
  beforeAll(async () => {
    try {
      await initDb();
    } catch (err) {
      // ignore init errors
    }
  });

  test('connects to PostgreSQL', async () => {
    const client = await pool.connect();
    await client.release();
    expect(client).toBeDefined();
  });

  test('has users and subscriptions tables', async () => {
    const res = await pool.query(
      "SELECT to_regclass('public.users') as users, to_regclass('public.subscriptions') as subscriptions"
    );
    expect(res.rows[0].users).toBe('users');
    expect(res.rows[0].subscriptions).toBe('subscriptions');
  });
});
