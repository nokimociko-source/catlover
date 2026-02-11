const express = require('express');
const { getDb } = require('../db');
const router = express.Router();

// Get stories feed
router.get('/', async (req, res) => {
  const db = getDb();
  try {
    const result = await db.query(`
      SELECT s.*, u.username, p.avatar_url 
      FROM stories s
      JOIN users u ON s.user_id = u.id
      JOIN user_profiles p ON u.id = p.user_id
      ORDER BY s.created_at DESC
      LIMIT 50
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Create story
router.post('/', async (req, res) => {
  const userId = req.user.userId;
  const { imageUrl } = req.body;
  const db = getDb();
  try {
    const result = await db.query(
      'INSERT INTO stories (user_id, image_url) VALUES ($1, $2) RETURNING *',
      [userId, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create story' });
  }
});

module.exports = router;
