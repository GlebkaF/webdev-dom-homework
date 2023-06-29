"use strict";

import { letClearForm, letDisabledButton } from "./changeelement.js";
import { sentComment } from "./optioncomments.js";
import { buttonElement, nameElement, textElement, listElement } from "./variables.js";
import { fetchComments } from "./api.js";

fetchComments();
    
    nameElement.addEventListener('input', () => {
      letDisabledButton(nameElement.value);
    });
    textElement.addEventListener('input', () => {
      letDisabledButton(textElement.value);
    });
    nameElement.addEventListener('click', () => {
      letClearForm(nameElement);
    });
    textElement.addEventListener('click', () => {
      letClearForm(textElement);
    });

  listElement.innerHTML = 'Пожалуйста подождите,комментарии подгружаются...'
  fetchComments();

   buttonElement.addEventListener('click', sentComment);

   document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
      sentComment();
    }
   })

    console.log("It works!");