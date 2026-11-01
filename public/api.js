const API_URL = 'https://wedev-api.sky.pro/api/v1/Dmitriy-Karavaev';

export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Сессия истекла');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Ошибка ${res.status}`);
  }
  return res;
}

export async function getUserProfile() {
  const res = await authFetch(`${API_URL}/profile`);
  return res.json();
}

export async function loadComments() {
  try {
    const res = await fetch(`${API_URL}/comments`);
    if (!res.ok) throw new Error('Не удалось загрузить комментарии');
    const data = await res.json();
    return Array.isArray(data) ? data : (data.comments || []);
  } catch (err) {
    console.error('Ошибка загрузки комментариев:', err);
    return [];
  }
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Неверный логин или пароль');
  }
  const { token } = await res.json();
  return token;
}