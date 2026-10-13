import { useEffect, useState } from 'react';
import { api, setToken, getToken } from './api';
import Auth from './pages/Auth.jsx';
import Today from './pages/Today.jsx';
import LessonView from './pages/Lesson.jsx';
import History from './pages/History.jsx';
import Board from './pages/Board.jsx';
import Me from './pages/Me.jsx';
import Toast from './components/Toast.jsx';

const TABS = [
  ['today',   'Today'],
  ['history', 'Log'],
  ['board',   'Board'],
  ['me',      'Me'],
];

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('today');
  const [openLesson, setOpenLesson] = useState(null); // { id, onDone }
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      if (getToken()) {
        try { setUser(await api.me()); } catch { setToken(null); }
      }
      setLoading(false);
    })();
  }, []);

  function showToast(msg, kind = 'info') {
    const id = Date.now();
    setToast({ msg, kind, id });
    setTimeout(() => setToast(t => (t && t.id === id ? null : t)), 2600);
  }

  async function handleLogin({ username, pin }) {
    const res = await api.login({ username, pin });
    setToken(res.token);
    setUser(await api.me());
  }

  function logout() {
    setToken(null); setUser(null); setTab('today'); setOpenLesson(null);
  }

  async function refreshUser() {
    try { setUser(await api.me()); } catch {}
  }

  if (loading) return <div className="boot">Loading…</div>;
  if (!user) return <Auth onSubmit={handleLogin} />;

  if (openLesson) {
    return (
      <div className="app">
        <LessonView
          lessonId={openLesson.id}
          onExit={async (result) => {
            setOpenLesson(null);
            if (result) {
              showToast(`+${result.points} pts · ${result.minutes} min well spent`, 'ok');
            }
            await refreshUser();
          }}
        />
        {toast && <Toast key={toast.id} msg={toast.msg} kind={toast.kind} />}
      </div>
    );
  }

  return (
    <div className="app">
      <header className="top">
        <div className="stat"><b>{user.totalMinutes}</b><span>min well spent</span></div>
        <div className="stat accent"><b>{user.streak}</b><span>day streak</span></div>
        <div className="stat"><b>{user.level}</b><span>level</span></div>
      </header>

      <main>
        {tab === 'today'   && <Today user={user} onOpen={setOpenLesson} toast={showToast} />}
        {tab === 'history' && <History toast={showToast} />}
        {tab === 'board'   && <Board user={user} />}
        {tab === 'me'      && <Me user={user} onLogout={logout} onUpdate={refreshUser} toast={showToast} />}
      </main>

      <nav className="nav">
        {TABS.map(([id, label]) => (
          <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </nav>

      {toast && <Toast key={toast.id} msg={toast.msg} kind={toast.kind} />}
    </div>
  );
}