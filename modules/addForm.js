import { postApiComment } from "./api.js";
import { loadComments } from "./comments.js";
import { format } from "date-fns";

let addForm;
let addFormButton;
let addFormName;
let addFormText;
let wait;

const getSafeString = (str) => str.trim()
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

export const init = () => {
  addForm = document.querySelector('.add-form');
  addFormButton = document.querySelector('.add-form-button');
  addFormName = document.querySelector('.add-form-name');
  addFormText = document.querySelector('.add-form-text');
  wait = document.querySelector('.wait');
  addFormButton.setAttribute('disabled', true);

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      AddComment();
    }
  });

  addFormButton.addEventListener('click', () => {
    AddComment();
  })

  addFormText.addEventListener('input', (e) => {
    if (addFormText.value === '') {
      addFormButton.setAttribute('disabled', true);
    } else {
      addFormButton.removeAttribute('disabled')
    }
  });
}

export const AddComment = () => {
  addForm.classList.add('add-form_disabled');
  wait.textContent = 'Комментарий добавляется...';

  postApiComment({
    text: getSafeString(addFormText.value),
    date: new Date(),
  }).then(() => {
    addForm.classList.remove('add-form_disabled');
    addFormText.value = '';
    addFormName.classList.remove('error');
    addFormText.classList.remove('error');
  })
    .catch((error) => {
      addForm.classList.remove('add-form_disabled');

      if (error.message === 'Bad Request') {
        if (addFormName.value === '' || addFormName.value.length < 3) {
          addFormName.classList.add('error');
        }
        if (addFormText.value === '' || addFormText.value.length < 3) {
          addFormText.classList.add('error');
        }
        alert('Имя и комментарий должны быть не короче 3 символов');
        return;
      }

      if (error.message === 'Сервер упал') {
        alert('Сервер сломался, попробуй позже');
        return;
      }

      alert('Ошибка соединения, попробуй позже');
      return;

    })
    .finally(() => {
      wait.textContent = '';
    });

  loadComments();
}

export const addCommentText = (text) => {
  addFormText.value = `${'>'}` + text;
}
