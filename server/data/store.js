import { Lessons } from '../lessons.js';
import { dayKey, yesterdayKey, lastNDays } from '../utils/dates.js';

export const users = new Map();
export const completions = [];

let nextUserId = 1;
let nextCompletionId = 1;

function addUser({
  username,
  city,
  commuteMinutes = 10,
  points = 0,
  streak = 0,
  bestStreak = 0,
  lastActive = null,
}) {
  const id = `u${nextUserId++}`;
  const user = {
    id,
    username: username.toLowerCase(),
    pin: '1234',
    city,
    commuteMinutes,
    points,
    streak,
    bestStreak,
    lastActive,
  };
  users.set(id, user);
  return user;
}

export function addCompletion({ userId, lessonId, dateKey, correct, total, points, minutes }) {
  const completion = {
    id: `c${nextCompletionId++}`,
    userId,
    lessonId,
    dateKey,
    correct,
    total,
    points,
    minutes,
  };
  completions.push(completion);
  return completion;
}

export function minutesForUser(userId) {
  return completions
    .filter(completion => completion.userId === userId)
    .reduce((sum, completion) => sum + completion.minutes, 0);
}

export function minutesForUserInRange(userId, days) {
  const dateKeys = new Set(lastNDays(days));
  return completions
    .filter(completion => completion.userId === userId && dateKeys.has(completion.dateKey))
    .reduce((sum, completion) => sum + completion.minutes, 0);
}

function seed() {
  const seedUsers = [
    { username: 'priya', city: 'Pune', commuteMinutes: 10, streak: 9, bestStreak: 14, loggedToday: false },
    { username: 'alex', city: 'Mumbai', commuteMinutes: 15, streak: 12, bestStreak: 21, loggedToday: true },
    { username: 'sam', city: 'Pune', commuteMinutes: 5, streak: 5, bestStreak: 11, loggedToday: true },
    { username: 'maya', city: 'Bangalore', commuteMinutes: 15, streak: 18, bestStreak: 18, loggedToday: true },
    { username: 'raj', city: 'Delhi', commuteMinutes: 10, streak: 3, bestStreak: 7, loggedToday: false },
    { username: 'kiran', city: 'Pune', commuteMinutes: 5, streak: 7, bestStreak: 12, loggedToday: false },
  ];

  const today = dayKey();
  const yesterday = yesterdayKey();

  for (const seedUser of seedUsers) {
    const user = addUser(seedUser);
    let runningPoints = 0;

    for (let i = 1; i <= seedUser.streak; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = dayKey(date);
      const lessonsCount = seedUser.commuteMinutes <= 5 ? 1 : seedUser.commuteMinutes <= 10 ? 2 : 3;

      for (let k = 0; k < lessonsCount; k++) {
        const lesson = Lessons[Math.floor(Math.random() * Lessons.length)];
        const correct = Math.random() < 0.75 ? 3 : Math.random() < 0.6 ? 2 : 1;
        const total = 3;
        const points = 20 + correct * 10 + (correct === total ? 20 : 0);
        addCompletion({
          userId: user.id,
          lessonId: lesson.id,
          dateKey,
          correct,
          total,
          points,
          minutes: lesson.minutes,
        });
        runningPoints += points;
      }
      user.lastActive = dateKey;
    }

    if (seedUser.loggedToday) {
      const lessonsCount = seedUser.commuteMinutes <= 5 ? 1 : seedUser.commuteMinutes <= 10 ? 2 : 3;
      for (let k = 0; k < lessonsCount; k++) {
        const lesson = Lessons[Math.floor(Math.random() * Lessons.length)];
        const correct = 2 + (Math.random() < 0.5 ? 1 : 0);
        const total = 3;
        const points = 20 + correct * 10 + (correct === total ? 20 : 0);
        addCompletion({
          userId: user.id,
          lessonId: lesson.id,
          dateKey: today,
          correct,
          total,
          points,
          minutes: lesson.minutes,
        });
        runningPoints += points;
      }
      user.lastActive = today;
    } else {
      user.lastActive = seedUser.streak > 0 ? yesterday : null;
    }

    user.points = runningPoints;
  }
}

seed();
