import { addButton, textInputElement, nameInputElement } from './handlers.js';
import { addComment } from './actionAndRenderFuncs.js';

export const bindEvents = () => {
  addButton.addEventListener('click', addComment);

  textInputElement.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      addComment();
    }
  });

  nameInputElement.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      addComment();
    }
  });
};
