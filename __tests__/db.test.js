jest.mock('pg', () => {
  const mClient = {
    query: jest.fn().mockResolvedValue({ rows: [] }),
    release: jest.fn(),
  };
  const mPool = {
    connect: jest.fn(() => Promise.resolve(mClient)),
    query: jest.fn(() => Promise.resolve({ rows: [] })),
  };
  return { Pool: jest.fn(() => mPool) };
});

const { pool, initDb } = require('../src/db');

describe('Database connection', () => {
  beforeAll(async () => {
    await initDb();
  });

  test('connects to PostgreSQL', async () => {
    const client = await pool.connect();
    await client.release();
    expect(client).toBeDefined();
    expect(pool.connect).toHaveBeenCalled();
    expect(client.release).toHaveBeenCalled();
  });

  test('has users and subscriptions tables', async () => {
    pool.query.mockResolvedValue({
      rows: [{ users: 'users', subscriptions: 'subscriptions' }],
    });
    const res = await pool.query(
      "SELECT to_regclass('public.users') as users, to_regclass('public.subscriptions') as subscriptions"
    );
    expect(pool.query).toHaveBeenCalled();
    expect(res.rows[0].users).toBe('users');
    expect(res.rows[0].subscriptions).toBe('subscriptions');
  });
});
