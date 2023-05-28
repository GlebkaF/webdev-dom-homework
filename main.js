"use strict";

import {
  commentList,
  startingElement,
  addFormElement,
  waitingElement,
  nameElement,
  textElement,
  addButton
} from "./data.js";
import { startFetch, handlePostClick } from "./api.js";

startingElement.classList.remove('hidden');
commentList.classList.add('hidden');

startFetch(commentList);

addButton.addEventListener('click', () => {
  if (!nameElement.value.trim()) {
    nameElement.classList.add('form-error');
    return;
  } else if (!textElement.value.trim()) {
    textElement.classList.add('form-error');
    return;
  } else {
    waitingElement.classList.remove('hidden');
    addFormElement.classList.add('hidden');

    handlePostClick(commentList);
  }

  nameElement.classList.remove('form-error');
  textElement.classList.remove('form-error');
});
textElement.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    if (!nameElement.value.trim()) {
      nameElement.classList.add('form-error');
      return;
    } else if (!textElement.value.trim()) {
      textElement.classList.add('form-error');
      return;
    } else {
      waitingElement.classList.remove('hidden');
      addFormElement.classList.add('hidden');
  
      handlePostClick(commentList);
    }
  
    nameElement.classList.remove('form-error');
    textElement.classList.remove('form-error');
  }
});
nameElement.addEventListener('input', () => {
  if (textElement.value.trim()) {
    addButton.disabled = false;
  }
});
textElement.addEventListener('input', () => {
  if (nameElement.value.trim()) {
    addButton.disabled = false;
  }
});