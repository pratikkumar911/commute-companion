import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { completions, users } from '../data/store.js';
import { dayKey, lastNDays } from '../utils/dates.js';

const router = Router();

function boardRows(scope) {
  const today = dayKey();
  const weekDays = new Set(lastNDays(7));
  const rows = [...users.values()].map(user => {
    const userCompletions = completions.filter(completion => completion.userId === user.id);
    const todayCompletions = userCompletions.filter(completion => completion.dateKey === today);
    const weekCompletions = userCompletions.filter(completion => weekDays.has(completion.dateKey));
    const sumMinutes = items => items.reduce((sum, completion) => sum + completion.minutes, 0);

    return {
      username: user.username,
      city: user.city,
      streak: user.streak,
      best_streak: user.bestStreak,
      today_minutes: sumMinutes(todayCompletions),
      week_minutes: sumMinutes(weekCompletions),
      all_minutes: sumMinutes(userCompletions),
      points: user.points,
    };
  });

  if (scope === 'today') {
    rows.sort((a, b) => b.today_minutes - a.today_minutes || b.streak - a.streak);
  } else if (scope === 'week') {
    rows.sort((a, b) => b.week_minutes - a.week_minutes || b.streak - a.streak);
  } else {
    rows.sort((a, b) => b.all_minutes - a.all_minutes || b.points - a.points);
  }

  return rows
    .filter(row => (scope === 'today'
      ? row.today_minutes
      : scope === 'week' ? row.week_minutes : row.all_minutes) > 0)
    .slice(0, 50);
}

router.get('/leaderboard', requireAuth, (req, res) => {
  const scope = ['today', 'week', 'all'].includes(req.query.scope) ? req.query.scope : 'week';
  const cityOnly = req.query.city === '1';
  const user = users.get(req.userId);

  let rows = boardRows(scope);
  if (cityOnly) {
    if (!user.city) return res.json([]);
    rows = rows.filter(row => (row.city || '').toLowerCase() === user.city.toLowerCase());
  }
  res.json(rows);
});

export default router;
