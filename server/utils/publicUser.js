import { minutesForUser, minutesForUserInRange } from '../data/store.js';
import { levelProgress } from './progress.js';

export default function publicUser(user) {
  const { pin, ...userDetails } = user;
  const totalMinutes = minutesForUser(user.id);
  const weekMinutes = minutesForUserInRange(user.id, 7);
  return { ...userDetails, totalMinutes, weekMinutes, ...levelProgress(totalMinutes) };
}
