import { Router } from 'express';
import { Lessons } from '../lessons.js';
import requireAuth from '../middleware/requireAuth.js';
import { completions, users } from '../data/store.js';
import { dayKey } from '../utils/dates.js';

const router = Router();

function queueForDate(date) {
  const seed = Number(date.replace(/-/g, ''));
  const indexes = Lessons.map((_, index) => index);
  let random = seed;
  for (let i = indexes.length - 1; i > 0; i--) {
    random = (random * 9301 + 49297) % 233280;
    const j = Math.floor((random / 233280) * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes.slice(0, 3).map(index => Lessons[index]);
}

router.get('/today', requireAuth, (req, res) => {
  const user = users.get(req.userId);
  const date = dayKey();
  const size = user.commuteMinutes <= 5 ? 1 : user.commuteMinutes <= 10 ? 2 : 3;
  const queue = queueForDate(date).slice(0, size);
  const done = completions.filter(completion => completion.userId === user.id && completion.dateKey === date);

  const items = queue.map(lesson => {
    const completion = done.find(item => item.lessonId === lesson.id);
    return {
      lesson: {
        id: lesson.id,
        category: lesson.category,
        title: lesson.title,
        minutes: lesson.minutes,
        questionCount: lesson.quiz.length,
      },
      completed: completion
        ? { correct: completion.correct, total: completion.total, points: completion.points }
        : null,
    };
  });

  res.json({
    date,
    commuteMinutes: user.commuteMinutes,
    queue: items,
    allDone: items.every(item => item.completed),
    someDone: items.some(item => item.completed),
    minutesToday: done.reduce((sum, completion) => sum + completion.minutes, 0),
    pointsToday: done.reduce((sum, completion) => sum + completion.points, 0),
  });
});

export default router;
