import { useEffect, useState } from 'react';
import { api } from '../api';

const SCOPES = [
  ['today', 'Today'],
  ['week',  'This week'],
  ['all',   'All time'],
];

export default function Board({ user }) {
  const [scope, setScope] = useState('week');
  const [cityOnly, setCityOnly] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.board(scope, cityOnly).then(setRows).finally(() => setLoading(false));
  }, [scope, cityOnly]);

  const valueKey = scope === 'today' ? 'today_minutes' : scope === 'week' ? 'week_minutes' : 'all_minutes';
  const valueLabel = 'min';

  return (
    <div className="pad">
      <div className="seg">
        {SCOPES.map(([id, label]) => (
          <button key={id} className={scope === id ? 'on' : ''} onClick={() => setScope(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="seg">
        <button className={!cityOnly ? 'on' : ''} onClick={() => setCityOnly(false)}>Global</button>
        <button className={cityOnly ? 'on' : ''} onClick={() => setCityOnly(true)}>My city</button>
      </div>

      {loading && <div className="muted">Loading…</div>}
      {!loading && !rows.length && <div className="muted">No one has logged yet. Be first!</div>}

      <div className="card">
        {rows.map((r, i) => (
          <div key={i} className={'lb-row' + (r.username === user.username ? ' me' : '')}>
            <div className="rank">{medal(i)}</div>
            <div className="who">
              <div className="strong">{r.username}</div>
              {r.city && <div className="muted small">{r.city} · {r.streak}d streak</div>}
            </div>
            <div className="pts">{r[valueKey]} <span className="muted small">{valueLabel}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function medal(i) {
  if (i === 0) return '🥇';
  if (i === 1) return '🥈';
  if (i === 2) return '🥉';
  return i + 1;
}