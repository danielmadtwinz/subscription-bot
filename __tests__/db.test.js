require('dotenv').config({ path: '.env.test' });
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
