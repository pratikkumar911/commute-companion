import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Me({ user, onLogout, onUpdate, toast }) {
  const [busy, setBusy] = useState(false);

  const pct = Math.max(0, Math.min(100, user.pct || 0));
  const toNext = Math.max(0, (user.nextFloor || 0) - user.totalMinutes);

  async function changeCommute(min) {
    setBusy(true);
    try { await api.updateMe({ commuteMinutes: min }); await onUpdate(); }
    catch (e) { toast(e.message, 'err'); }
    finally { setBusy(false); }
  }

  return (
    <div className="pad">
      <div className="card">
        <h2>{user.username}</h2>
        {user.city && <div className="muted small">{user.city}</div>}

        <div className="lvl">
          <div className="lvl-top">
            <span>Level {user.level}</span>
            <span className="muted small">
              {toNext > 0 ? `${toNext} min to level ${user.level + 1}` : 'Max level'}
            </span>
          </div>
          <div className="bar"><div className="bar-fill" style={{ width: pct + '%' }} /></div>
        </div>
      </div>

      <div className="card summary">
        <div><b>{user.totalMinutes}</b><span>minutes well spent</span></div>
        <div><b>{user.streak}</b><span>day streak</span></div>
        <div><b>{user.bestStreak}</b><span>best streak</span></div>
      </div>

      <div className="card">
        <div className="date-head">Commute length</div>
        <div className="seg">
          {[5, 10, 15].map(m => (
            <button key={m} disabled={busy}
                    className={user.commuteMinutes === m ? 'on' : ''}
                    onClick={() => changeCommute(m)}>
              {m} min
            </button>
          ))}
        </div>
        <p className="muted small" style={{ margin: '6px 0 0' }}>
          Today's queue is sized to fit this. Change it any time.
        </p>
      </div>

      <div className="card">
        <div className="date-head">Badges</div>
        <div className="badges">
          <Badge label="First Lesson"    earned={user.totalMinutes > 0} />
          <Badge label="7-Day Streak"    earned={user.bestStreak >= 7} />
          <Badge label="30-Day Streak"   earned={user.bestStreak >= 30} />
          <Badge label="100 Minutes"     earned={user.totalMinutes >= 100} />
          <Badge label="500 Minutes"     earned={user.totalMinutes >= 500} />
          <Badge label="1000 Minutes"    earned={user.totalMinutes >= 1000} />
          <Badge label="Level 5"         earned={user.level >= 5} />
          <Badge label="Level 10"        earned={user.level >= 10} />
        </div>
      </div>

      <button className="btn ghost full" onClick={onLogout}>Sign out</button>
    </div>
  );
}

function Badge({ label, earned }) {
  return <div className={'badge' + (earned ? ' earned' : '')}>{earned ? '🏅' : '🔒'} {label}</div>;
}