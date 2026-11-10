import { comments } from './comments.js';
import { formatDate } from './formatDate.js';
import { renderComments } from './render.js';

export function initAddComment() {
  const nameInput = document.querySelector('.add-form-name');
  const textInput = document.querySelector('.add-form-text');
  const addButton = document.querySelector('.add-form-button');

  nameInput.addEventListener('input', () =>
    nameInput.classList.remove('error'),
  );
  textInput.addEventListener('input', () =>
    textInput.classList.remove('error'),
  );

  addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    nameInput.classList.toggle('error', name === '');
    textInput.classList.toggle('error', text === '');
    if (name === '' || text === '') return;

    comments.push({
      name: name,
      date: formatDate(new Date()),
      text: text,
      likes: 0,
      isLiked: false,
    });

    renderComments();

    nameInput.value = '';
    textInput.value = '';
  });
}