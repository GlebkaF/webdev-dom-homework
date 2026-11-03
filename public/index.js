import { renderLoginPage, renderFeedPage } from './render.js';
import { getUserProfile, loadComments } from './api.js';

async function init() {
  const path = window.location.pathname;

  if (path === '/login' || path === '/login.html') {
    renderLoginPage();
    return; 
  }

  let isAuth = !!localStorage.getItem('token');
  let user = null;

  if (isAuth) {
    try {
      user = await getUserProfile();
    } catch (error) {
      console.error('Ошибка получения профиля:', error);
      localStorage.removeItem('token');
      isAuth = false;
      user = null;
    }
  }

  const comments = await loadComments();
  renderFeedPage(comments, isAuth, user);
}

init();