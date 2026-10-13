import { users } from '../data/store.js';

export default function requireAuth(req, res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;
  if (!token || !users.has(token)) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  req.userId = token;
  next();
}
