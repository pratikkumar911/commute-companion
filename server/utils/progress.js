export function levelProgress(minutes) {
  const level = Math.min(50, Math.floor(minutes / 30) + 1);
  const curFloor = (level - 1) * 30;
  const nextFloor = level * 30;
  const pct = Math.max(0, Math.min(100, Math.round(((minutes - curFloor) / 30) * 100)));
  return { level, curFloor, nextFloor, pct };
}
