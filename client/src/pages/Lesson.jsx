import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Lesson({ lessonId, onExit }) {
  const [lesson, setLesson] = useState(null);
  const [stage, setStage] = useState('read');   // 'read' | 'quiz' | 'result'
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    api.lesson(lessonId).then(l => {
      setLesson(l);
      setAnswers(new Array(l.quiz.length).fill(-1));
    }).catch(e => setErr(e.message));
  }, [lessonId]);

  if (err) return <div className="pad"><p className="err">{err}</p><button className="btn full" onClick={() => onExit()}>Back</button></div>;
  if (!lesson) return <div className="pad muted">Loading…</div>;

  async function submit() {
    if (answers.some(a => a < 0)) { setErr('Answer all questions first.'); return; }
    setBusy(true); setErr('');
    try {
      const res = await api.complete(lesson.id, answers);
      setResult(res);
      setStage('result');
    } catch (e) { setErr(e.message); }
    finally { setBusy(false); }
  }

  return (
    <div className="lesson-page">
      <header className="lesson-head">
        <button className="back" onClick={() => onExit(result)}>←</button>
        <div className="lh-mid">
          <div className="muted small">{lesson.category}</div>
          <div className="strong">{lesson.title}</div>
        </div>
        <div className="muted small">{lesson.minutes} min</div>
      </header>

      {stage === 'read' && (
        <div className="pad">
          <div className="card read-body">
            {lesson.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <button className="btn primary full big-btn" onClick={() => setStage('quiz')}>
            Start quiz
          </button>
        </div>
      )}

      {stage === 'quiz' && (
        <div className="pad">
          {lesson.quiz.map((q, qi) => (
            <div key={qi} className="card">
              <div className="q-text">
                <span className="q-num">{qi + 1}.</span> {q.q}
              </div>
              <div className="options">
                {q.options.map((opt, oi) => (
                  <label key={oi} className={'opt' + (answers[qi] === oi ? ' on' : '')}>
                    <input type="radio" name={'q' + qi}
                           checked={answers[qi] === oi}
                           onChange={() => {
                             const next = [...answers]; next[qi] = oi; setAnswers(next);
                           }} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          {err && <p className="err">{err}</p>}
          <button className="btn primary full big-btn" onClick={submit} disabled={busy}>
            {busy ? 'Checking…' : 'Submit answers'}
          </button>
        </div>
      )}

      {stage === 'result' && result && (
        <div className="pad">
          <div className="card result-hero">
            <div className="big-num">{result.correct}/{result.total}</div>
            <div className="muted">
              {result.perfect ? 'Perfect score!' : result.correct >= 2 ? 'Well done.' : 'Keep going.'}
            </div>
            <div className="reward-row">
              <div><b>+{result.points}</b><span>points</span></div>
              <div><b>+{result.minutes}</b><span>min well spent</span></div>
              {result.streakUpdated && <div><b>{result.streak}</b><span>day streak</span></div>}
            </div>
          </div>

          {result.review.map((r, i) => (
            <div key={i} className={'card review ' + (r.ok ? 'ok' : 'bad')}>
              <div className="q-text">
                <span className="q-num">{i + 1}.</span> {r.q}
              </div>
              <div className="rev-line">
                <span>Your answer:</span>
                <b className={r.ok ? 'ok' : 'bad'}>{r.options[r.your]}</b>
              </div>
              {!r.ok && (
                <div className="rev-line">
                  <span>Correct:</span>
                  <b className="ok">{r.options[r.correct]}</b>
                </div>
              )}
            </div>
          ))}

          <button className="btn primary full big-btn" onClick={() => onExit(result)}>
            Done — back to today
          </button>
        </div>
      )}
    </div>
  );
}