import { useState } from 'react';

const DEMOS = [
  { u: 'priya', note: 'not yet today' },
  { u: 'alex',  note: 'done today' },
  { u: 'sam',   note: 'done today' },
  { u: 'maya',  note: 'done today' },
  { u: 'raj',   note: 'not yet today' },
  { u: 'kiran', note: 'not yet today' },
];

export default function Auth({ onSubmit }) {
  const [username, setUsername] = useState('priya');
  const [pin, setPin] = useState('1234');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function handle(e) {
    e.preventDefault();
    setErr(''); setBusy(true);
    try { await onSubmit({ username, pin }); }
    catch (e) { setErr(e.message); }
    finally { setBusy(false); }
  }

  return (
    <div className="auth">
      <h1>Commute <span className="accent">Companion</span></h1>
      <p className="muted">A 5-minute lesson for your ride. Build a streak. Track minutes well spent.</p>

      <form onSubmit={handle}>
        <label>Username
          <input value={username} onChange={e => setUsername(e.target.value)}
                 autoCapitalize="none" autoCorrect="off" spellCheck="false" required />
        </label>
        <label>PIN
          <input value={pin} onChange={e => setPin(e.target.value)}
                 type="password" inputMode="numeric" pattern="[0-9]*" required />
        </label>
        <button className="btn primary full" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        {err && <p className="err">{err}</p>}
      </form>

      <div className="demo-box">
        <div className="demo-title">Demo accounts — PIN is <b>1234</b></div>
        <div className="demo-row">
          {DEMOS.map(d => (
            <button key={d.u} type="button" className="chip"
                    onClick={() => { setUsername(d.u); setPin('1234'); }}>
              <b>{d.u}</b><span>{d.note}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}