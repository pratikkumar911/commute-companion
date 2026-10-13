import { Router } from 'express';
import { Lessons } from '../lessons.js';
import requireAuth from '../middleware/requireAuth.js';
import { addCompletion, completions, minutesForUser, users } from '../data/store.js';
import { dayKey, yesterdayKey } from '../utils/dates.js';

const router = Router();

router.get('/lessons/:id', requireAuth, (req, res) => {
  const lesson = Lessons.find(item => item.id === req.params.id);
  if (!lesson) return res.status(404).json({ error: 'lesson not found' });
  res.json(lesson);
});

router.post('/lessons/:id/complete', requireAuth, (req, res) => {
  const user = users.get(req.userId);
  const lesson = Lessons.find(item => item.id === req.params.id);
  if (!lesson) return res.status(404).json({ error: 'lesson not found' });

  const { answers } = req.body || {};
  if (!Array.isArray(answers) || answers.length !== lesson.quiz.length) {
    return res.status(400).json({ error: 'answers required' });
  }

  const date = dayKey();
  if (completions.find(completion =>
    completion.userId === user.id && completion.lessonId === lesson.id && completion.dateKey === date
  )) {
    return res.status(400).json({ error: 'already completed today' });
  }

  let correct = 0;
  const review = lesson.quiz.map((question, index) => {
    const isCorrect = answers[index] === question.answer;
    if (isCorrect) correct++;
    return {
      q: question.q,
      options: question.options,
      your: answers[index],
      correct: question.answer,
      ok: isCorrect,
    };
  });

  const total = lesson.quiz.length;
  const perfect = correct === total;
  const points = 20 + correct * 10 + (perfect ? 20 : 0);
  let streakUpdated = false;
  if (user.lastActive !== date) {
    if (user.lastActive === yesterdayKey()) user.streak += 1;
    else user.streak = 1;
    user.bestStreak = Math.max(user.bestStreak, user.streak);
    user.lastActive = date;
    streakUpdated = true;
  }

  addCompletion({
    userId: user.id,
    lessonId: lesson.id,
    dateKey: date,
    correct,
    total,
    points,
    minutes: lesson.minutes,
  });
  user.points += points;

  res.json({
    correct,
    total,
    perfect,
    points,
    minutes: lesson.minutes,
    review,
    streak: user.streak,
    streakUpdated,
    totalMinutes: minutesForUser(user.id),
    pointsTotal: user.points,
  });
});

export default router;
