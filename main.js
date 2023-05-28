'use strict';

import { getComments, postFetch, comments } from "./api.js";

const listComments = document.getElementById('comments-users');

getComments();

export const renderComments = () => {
  const commentsHTML = comments
    .map((comment, index) => {
      const formattedDate = formatDate(new Date(comment.date));
      return `<li data-index="${index}" class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
            <div>${formattedDate}</div>
          </div>
        <div class="comment-body">
          <div class="comment-text">${comment.text}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="like-button ${
        comment.isLiked ? '-active-like' : ''
      }"></button>
          </div>
        </div>
      </li>`;
    })
    .join('');

  listComments.innerHTML = commentsHTML;
  counterLikes();
  answerComment();
};

renderComments();

export function formatDate(date) {
  const year = date.getFullYear().toString().slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function counterLikes() {
  const likesButtonElements = document.querySelectorAll('.like-button');

  likesButtonElements.forEach((likesButtonElement) => {
    likesButtonElement.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = likesButtonElement.dataset.index;
      const comment = comments[index];

      if (comment.isLiked) {
        comment.likes = comment.likes - 1;
        likesButtonElement.classList.remove('-active-like');
      } else {
        comment.likes = comment.likes + 1;
        likesButtonElement.classList.add('-active-like');
      }

      comment.isLiked = !comment.isLiked;

      renderComments();
    });
  });
}

function answerComment() {
  const oldComments = document.querySelectorAll('.comment');

  for (let oldComment of oldComments) {
    oldComment.addEventListener('click', (event) => {
      event.stopPropagation();

      const index = oldComment.dataset.index;
      const comment = comments[index];

      textInputElement.value = `QUOTE_BEGIN ${comment.text}\n${comment.name} QUOTE_END`;
    });
  }
}

const buttonElement = document.getElementById('button-add');
const listElement = document.getElementById('comments-users');
export const nameInputElement = document.getElementById('name-input');
export const textInputElement = document.getElementById('text-input');

const addComment = () => {
  buttonElement.disabled = true;
  buttonElement.textContent = 'Комментарий добавляется...';
  document.getElementById('name-input').disabled = false;
  document.getElementById('text-input').disabled = false;

  postFetch();

}

buttonElement.addEventListener('click', addComment);

const deleteComment = () => {
  comments.pop();
  renderComments();
};

textInputElement.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addComment();
    event.preventDefault();
  }
});

const buttonDeleteElement = document.getElementById('button-delete');

buttonDeleteElement.addEventListener('click', deleteComment);

const addButtonElement = document.getElementById('button-add');

addButtonElement.disabled = true;
addButtonElement.classList.add('empty');
nameInputElement.addEventListener('input', handleInput);
textInputElement.addEventListener('input', handleInput);

function handleInput() {
  if (nameInputElement.value.trim() !== '' && textInputElement.value.trim() !== '') {
    addButtonElement.disabled = false;
    addButtonElement.classList.remove('empty');
  } else {
    addButtonElement.disabled = true;
    addButtonElement.classList.add('empty');
  }
}