const axios = require('axios');
jest.mock('axios');
require('dotenv').config({ path: '.env.test.example' });

const { getPlans } = require('../services/zenky');

describe('Zenky service', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  test('successfully fetches plans', async () => {
    process.env.ZENKY_TOKEN = 'token';
    const plans = [
      { id: 1, name: 'Basic', price: 10 },
      { id: 2, name: 'Pro', price: 20 },
    ];
    axios.get.mockResolvedValue({ data: plans });

    const res = await getPlans();
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.zenky.io/v1/plans',
      { headers: { Authorization: 'Bearer token' } }
    );
    expect(res).toEqual(plans);
  });

  test('throws on network or HTTP error', async () => {
    process.env.ZENKY_TOKEN = 'token';
    axios.get.mockRejectedValue(new Error('Network error'));
    await expect(getPlans()).rejects.toThrow('Network error');
  });

  test('throws on invalid response structure', async () => {
    process.env.ZENKY_TOKEN = 'token';
    axios.get.mockResolvedValue({ data: { foo: 'bar' } });
    await expect(getPlans()).rejects.toThrow('Invalid response format');
  });
});
