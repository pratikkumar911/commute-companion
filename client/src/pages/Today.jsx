import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Today({ user, onOpen, toast }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setData(await api.today()); }
    catch (e) { toast(e.message, 'err'); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  if (loading || !data) return <div className="pad muted">Loading today's ride…</div>;

  const { queue, commuteMinutes, allDone, minutesToday, pointsToday } = data;
  const doneCount = queue.filter(q => q.completed).length;

  return (
    <div className="pad">
      <div className="hero">
        <div className="lbl">TODAY'S COMMUTE</div>
        <h2>{commuteMinutes} minutes</h2>
        <p className="muted">
          {queue.length} {queue.length === 1 ? 'bite' : 'bites'} · {minutesToday}/{commuteMinutes} min well spent
        </p>
      </div>

      <div className="progress">
        <div className="progress-fill" style={{ width: `${(doneCount / queue.length) * 100}%` }} />
      </div>

      {allDone && (
        <div className="card done">
          <div className="big">✓</div>
          <h3>Commute complete</h3>
          <p className="muted">{minutesToday} min well spent · +{pointsToday} pts</p>
          <p className="muted small">Come back tomorrow to keep the streak alive.</p>
        </div>
      )}

      {queue.map((item, i) => (
        <button key={item.lesson.id}
                className={'lesson-card' + (item.completed ? ' done' : '')}
                onClick={() => !item.completed && onOpen({ id: item.lesson.id })}>
          <div className="lc-top">
            <span className="cat">{item.lesson.category}</span>
            <span className="mins">{item.lesson.minutes} min</span>
          </div>
          <div className="lc-title">{item.lesson.title}</div>
          <div className="lc-bottom">
            {item.completed ? (
              <span className="ok">✓ {item.completed.correct}/{item.completed.total} correct · +{item.completed.points} pts</span>
            ) : (
              <span className="go">Start →</span>
            )}
          </div>
        </button>
      ))}

      <p className="muted small center" style={{ marginTop: 18 }}>
        Bites are sized to your {commuteMinutes}-minute commute. Change it in the Me tab.
      </p>
    </div>
  );
}