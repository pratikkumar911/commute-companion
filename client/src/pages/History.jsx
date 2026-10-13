import { useEffect, useState } from 'react';
import { api } from '../api';

export default function History({ toast }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.history().then(setItems).catch(e => toast(e.message, 'err')).finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  if (loading) return <div className="pad muted">Loading…</div>;
  if (!items.length) return <div className="pad muted">No lessons completed yet. Start with today's bite.</div>;

  const byDate = items.reduce((acc, c) => { (acc[c.dateKey] ||= []).push(c); return acc; }, {});
  const totalMin = items.reduce((s, c) => s + c.minutes, 0);

  return (
    <div className="pad">
      <div className="card summary">
        <div><b>{items.length}</b><span>lessons</span></div>
        <div><b>{totalMin}</b><span>minutes</span></div>
        <div><b>{items.reduce((s, c) => s + c.points, 0)}</b><span>points</span></div>
      </div>

      {Object.entries(byDate).map(([date, list]) => (
        <div key={date} className="card">
          <div className="date-head">{niceDate(date)}</div>
          {list.map(c => (
            <div key={c.id} className="log-row">
              <div>
                <div className="strong">{c.title || c.lessonId}</div>
                <div className="muted small">
                  {c.category} · {c.correct}/{c.total} · {c.minutes} min
                </div>
              </div>
              <div className="pts">+{c.points}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function niceDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff = Math.round((today - d) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}