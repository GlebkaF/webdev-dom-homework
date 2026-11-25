import { postComment } from './api.js';
import { loadComments } from './loadComments.js';

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

  addButton.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    nameInput.classList.toggle('error', name === '');
    textInput.classList.toggle('error', text === '');
    if (name === '' || text === '') return;

    addButton.disabled = true;
    addButton.textContent = 'Отправка...';

    try {
      await postComment(name, text);
      await loadComments();

      nameInput.value = '';
      textInput.value = '';
    } catch (error) {
      alert(error.message);
    } finally {
      addButton.disabled = false;
      addButton.textContent = 'Написать';
    }
  });
}