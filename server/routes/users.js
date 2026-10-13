import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { users } from '../data/store.js';
import publicUser from '../utils/publicUser.js';

const router = Router();

router.get('/me', requireAuth, (req, res) => {
  res.json(publicUser(users.get(req.userId)));
});

router.patch('/me', requireAuth, (req, res) => {
  const user = users.get(req.userId);
  const { commuteMinutes } = req.body || {};
  if ([5, 10, 15].includes(commuteMinutes)) user.commuteMinutes = commuteMinutes;
  res.json(publicUser(user));
});

export default router;
