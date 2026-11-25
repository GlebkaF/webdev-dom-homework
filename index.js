import { loadComments } from './modules/loadComments.js';
import { initAddComment } from './modules/initAddComment.js';

const listElement = document.querySelector('.comments');
listElement.textContent = 'Загрузка комментариев...';

loadComments().catch((error) => {
  listElement.textContent = error.message;
});

initAddComment();