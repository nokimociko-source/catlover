const express = require('express');
const { getDb } = require('../db');
const router = express.Router();

// Get 2FA Status
router.get('/status', async (req, res) => {
  const userId = req.user.userId;
  const db = getDb();
  try {
    const result = await db.query('SELECT enabled FROM user_2fa WHERE user_id = $1', [userId]);
    res.json({ enabled: result.rows.length > 0 && result.rows[0].enabled });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch 2FA status' });
  }
});

// Update Presence
router.post('/presence', async (req, res) => {
  const userId = req.user.userId;
  const { status } = req.body; // 'online', 'offline', 'away'
  const db = getDb();
  try {
    await db.query(
      'UPDATE user_profiles SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2',
      [status, userId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update presence' });
  }
});

module.exports = router;
