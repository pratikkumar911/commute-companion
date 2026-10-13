import { Router } from 'express';
import { users } from '../data/store.js';
import publicUser from '../utils/publicUser.js';

const router = Router();

router.post('/login', (req, res) => {
  const { username, pin } = req.body || {};
  if (!username || !pin) {
    return res.status(400).json({ error: 'username and pin required' });
  }
  const user = [...users.values()].find(candidate => candidate.username === String(username).toLowerCase());
  if (!user || user.pin !== String(pin)) {
    return res.status(401).json({ error: 'invalid credentials' });
  }
  res.json({ token: user.id, user: publicUser(user) });
});

export default router;
