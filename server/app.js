import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.js';
import historyRoutes from './routes/history.js';
import leaderboardRoutes from './routes/leaderboard.js';
import lessonRoutes from './routes/lessons.js';
import todayRoutes from './routes/today.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', todayRoutes);
app.use('/api', lessonRoutes);
app.use('/api', historyRoutes);
app.use('/api', leaderboardRoutes);

export default app;
