import { Router } from 'express';
import { Lessons } from '../lessons.js';
import requireAuth from '../middleware/requireAuth.js';
import { completions } from '../data/store.js';

const router = Router();

router.get('/history', requireAuth, (req, res) => {
  const list = completions
    .filter(completion => completion.userId === req.userId)
    .sort((a, b) => b.dateKey.localeCompare(a.dateKey) || b.id.localeCompare(a.id))
    .slice(0, 80)
    .map(completion => {
      const lesson = Lessons.find(item => item.id === completion.lessonId);
      return {
        ...completion,
        category: lesson?.category,
        title: lesson?.title,
      };
    });
  res.json(list);
});

export default router;
