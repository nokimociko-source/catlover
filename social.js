const express = require('express');
const { getDb } = require('./db');
const router = express.Router();

// Follow user
router.post('/follow/:id', async (req, res) => {
  const followerId = req.user.userId;
  const followingId = req.params.id;
  const db = getDb();
  try {
    await db.query(
      'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [followerId, followingId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to follow user' });
  }
});

// Unfollow user
router.post('/unfollow/:id', async (req, res) => {
  const followerId = req.user.userId;
  const followingId = req.params.id;
  const db = getDb();
  try {
    await db.query(
      'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
      [followerId, followingId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
});

module.exports = router;
