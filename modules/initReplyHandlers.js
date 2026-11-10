import { comments } from './comments.js';

export function initReplyHandlers() {
  const textInput = document.querySelector('.add-form-text');
  const commentElements = document.querySelectorAll('.comment');

  for (const commentElement of commentElements) {
    commentElement.addEventListener('click', () => {
      const comment = comments[commentElement.dataset.index];

      textInput.value = `> ${comment.name}: ${comment.text}\n\n`;
      textInput.classList.remove('error');
      textInput.focus();
    });
  }
}