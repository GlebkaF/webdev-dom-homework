import { escapeHtml } from './utils.js';
import { login } from './api.js';

export function renderLoginPage() {
  document.body.innerHTML = `
    <div class="login-container">
      <h2>Авторизация</h2>
      <form id="loginForm">
        <input id="email" type="email" placeholder="Email" required>
        <input id="password" type="password" placeholder="Пароль" required>
        <button type="submit">Войти</button>
        <div id="error" style="color:red"></div>
      </form>
    </div>
  `;

  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const errorEl = document.getElementById('error');
      errorEl.textContent = '';

      try {
        const token = await login(email, password);
        localStorage.setItem('token', token);
        window.location.href = '/';
      } catch (err) {
        errorEl.textContent = err.message;
      }
    });
  }
}

export function renderFeedPage(comments, isAuth, user) {
  let formHtml = '';
  
  if (isAuth && user) {
    formHtml = `
      <div class="comment-form">
        <form id="commentForm">
          <input type="text" value="${escapeHtml(user.name)}" readonly>
          <textarea id="text" placeholder="Ваш комментарий" required></textarea>
          <button type="submit">Написать</button>
        </form>
      </div>
    `;
  } 

  else {
    formHtml = `
      <div class="guest-card">
        <p class="guest-text">Чтобы добавить комментарий, нажмите:</p>
        <button id="js-login-btn" class="login-btn" type="button">Войти</button>
      </div>
    `;
  }

  const commentsHtml = comments.map(c => `
    <li class="comment">
      <div class="comment-header">
        <span>${escapeHtml(c.name)}</span>
        <span>${new Date(c.date).toLocaleString()}</span>
      </div>
      <div class="comment-body">
        <p>${escapeHtml(c.text)}</p>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button type="button" class="like-button" aria-label="Лайк"></button>
        </div>
      </div>
    </li>
  `).join('');

  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('Контейнер #app не найден в HTML.');
    return;
  }

  appContainer.innerHTML = `
    <div class="comments-container">
      <h1>Лента комментариев</h1>
      <ul class="comments" id="comments-list">
        ${commentsHtml}
      </ul>
      ${formHtml}
    </div>
  `;

  if (isAuth && user) {
    const form = document.getElementById('commentForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = document.getElementById('text').value.trim();

        if (text.length < 3) {
          alert('Комментарий должен содержать минимум 3 символа!');
          return;
        }

        try {
          await authFetch('https://wedev-api.sky.pro/api/v1/Dmitriy-Karavaev/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: user.name, text })
          });
          window.location.reload();
        } catch (err) {
          alert(err.message);
        }
      });
    }
  } 
 
  else {
    const loginBtn = document.getElementById('js-login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.history.pushState({}, '', '/login'); 
        renderLoginPage();
      });
    }
  }
}