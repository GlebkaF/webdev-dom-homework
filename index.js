'use strict';

import { getComments, addComments } from "./api.js";
import { renderLogin } from "./login-components.js";

let comments = [];
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

token = null;

const fetchAndRender = async () => {
  return getComments({ token }).then((responseData) => {
    comments = responseData.comments.map((comment) => {
      const date = new Date(comment.date);
      return {
        name: comment?.author?.name,
        date: formatDate(date),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });
    renderApp();
  });
};

const renderApp = () => {
  const appElement = document.getElementById("app");
  const commentsHtml = comments.map((comment, index) => {
      return `<li class="comment">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text" data-index='${index}'> ${comment.text}</div>
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
    .join("");

  const appHtml = `<main class="container">
    <ul class="comments" id="comments-users"> 
    ${commentsHtml}   
      </ul>  
      <div class="add-form">
        <input
          id="name-input"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"/>
      <textarea
          id="text-input"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш комментарий"
          rows="4"></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="button-add">Написать</button>
        </div>
      </div>
    </main>`;

  appElement.innerHTML = appHtml;

  if (!token) {
    renderLogin({appElement, setToken: (newToken) => {
      token = newToken;
    }, 
    fetchAndRender,
  })
    return;
  }

  const buttonElement = document.getElementById("button-add");
  const inputNameElement = document.getElementById("name-input");
  const textareaElement = document.getElementById("text-input");

  const newComment = () => {

    addComments = () => ({
      token,
      name: inputNameElement.value,
      text: textareaElement.value,
    })
      .then((response) => {
        if (response.status === 500) {
          return Promise.reject(new Error("Сервер упал"));
        } else if (response.status === 400) {
          return Promise.reject(new Error("Неправильный ввод"));
        } else {
          return fetchAndRender();
        }
      })
      .then(() => {
        buttonElement.disabled = false;
        inputNameElement.value = "";
        textareaElement.value = "";
      })
      .catch((error) => {
        buttonElement.disabled = false;
        if (error.message === "Сервер сломался, попробуйте позже") {
          return newComment();
        }
        if (error.message === "Неправильный ввод") {
          alert("Имя и комментарий должны быть не короче 3 символов");
        } else {
          alert("Кажется, у вас сломался интернет");
        }
      });
  };
  buttonElement.addEventListener("click", newComment);
  counterLikes();
};
renderApp();

// --------- Задаем формат даты --------------------------

function formatDate(date) {
  const year = date.getFullYear().toString().slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// --------- Это счетчик лайков --------------------------

function counterLikes() {
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

      renderApp();
    });
  });
}