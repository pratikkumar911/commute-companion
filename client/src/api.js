const BASE = '/api';
let token = localStorage.getItem('token') || null;

export function setToken(t) {
  token = t;
  if (t) localStorage.setItem('token', t);
  else localStorage.removeItem('token');
}
export const getToken = () => token;

async function req(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(BASE + path, { ...opts, headers });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `HTTP ${r.status}`);
  return data;
}

export const api = {
  login:        b => req('/auth/login', { method: 'POST', body: JSON.stringify(b) }),
  me:           () => req('/me'),
  updateMe:     b => req('/me', { method: 'PATCH', body: JSON.stringify(b) }),
  today:        () => req('/today'),
  lesson:       id => req('/lessons/' + id),
  complete:     (id, answers) => req(`/lessons/${id}/complete`, { method: 'POST', body: JSON.stringify({ answers }) }),
  history:      () => req('/history'),
  board:        (scope, city) => req(`/leaderboard?scope=${scope}${city ? '&city=1' : ''}`),
};