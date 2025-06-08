require('dotenv').config();
const axios = require('axios');

const API_BASE = 'https://api.zenky.io/v1';

function getAuthHeader() {
  const token = process.env.ZENKY_TOKEN;
  if (!token) {
    throw new Error('ZENKY_TOKEN is not set');
  }
  return { Authorization: `Bearer ${token}` };
}

async function getPlans() {
  try {
    const res = await axios.get(`${API_BASE}/plans`, {
      headers: getAuthHeader(),
    });
    if (!Array.isArray(res.data)) {
      throw new Error('Invalid response format');
    }
    res.data.forEach((plan) => {
      if (!plan.id || !plan.name || plan.price === undefined) {
        throw new Error('Invalid plan structure');
      }
    });
    return res.data;
  } catch (err) {
    console.error('Zenky API error:', err.message);
    throw err;
  }
}

module.exports = {
  getPlans,
};
