"use strict";

import { addComment, getComments } from "./api.js";
import { getCommentDate } from "./components/date-component.js";
import { renderLoginComponent } from "./components/login-component.js";
import { initLikeButton } from "./components/like-button-component.js";
import { replyТoСomment } from "./components/reply-component.js";


let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

token = null;

export let users = [];
//Получить список комментариев

const fetchUsersAndRender = () => {
   return getComments({ token }).then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: getCommentDate(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
        }
      })
      users = appComments;
      console.log(users);
      renderApp();
    })
    .catch((error) => {
      if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
        console.log(error);
        return;
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
        console.log(error);
        return;
      }
    });
}
fetchUsersAndRender();


const renderApp = () =>{
  const appEl = document.getElementById("app");

  const usersHtml = users.map((user, index) =>{
    return  `<li class="comment" data-comment="${user.text}" data-name="${user.name}">
    <div class="comment-header">
      <div>${user.name}</div>
      <div>${user.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${user.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${user.likes}</span>
        <button class="like-button ${user.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
      </div>
    </div>
    </li>`
  }).join('');

  const renderListComponent = ({ usersHtml, appEl }) => {
    let appHtml = users.map((user) =>{
      return `
        <ul class="comments" id="comment-list">
          ${usersHtml}
          </ul>
          <div class="add-form-row" style="justify-content: center" >
            <button class="add-form-button" id="delete-button">Удалить комментарий</button>
          </div>
      <div id="add">
        <div class="add-form">
          <input
            id="name-input"
            type="text"
            class="add-form-name"
            value="${user.name}"
            readonly="readonly"
          />
          <textarea
            id="comment-text"
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="write-button">Написать</button>
          </div>
        </div>
      </div>
      <div id="load" class="hidden">
        <h3 style="font-family: Helvetica; color: #ffffff;">Комментарий добавляется...</h3>
      </div>`  }).join('');
    appEl.innerHTML = appHtml;
}

  if (!token) {
    renderLoginComponent({ appEl, setToken: (newToken) => {
      token = newToken;
    }, fetchUsersAndRender, usersHtml });
    return;
  }

  renderListComponent({ usersHtml, appEl });


  const writeButtonEl = document.getElementById("write-button");
  const nameInputEl = document.getElementById("name-input");
  const commentTextEl = document.getElementById("comment-text");
  let listEl = document.getElementById("comment-list");
  const deleteButtonEl = document.getElementById("delete-button");

  //loader

  //const showDownload = () => {
  //  listEl.innerHTML = `<h3 style="font-family: Helvetica; color: #ffffff;">Пожалуйста подождите. Загружаю комментарии...</h3>`;
  //  deleteButtonEl.style.display = 'none';
  //  return fetchUsersAndRender()
  //    .then(() => {
  //      deleteButtonEl.style.display = 'flex';
  //    });
  //}
  //showDownload();

  document.addEventListener("keyup", (e) => {
      if (e.code === "Enter") {
          WriteButtonEl.click();
      }
  });

  writeButtonEl.setAttribute("disabled", true);
  writeButtonEl.classList.add("error-btn");

  nameInputEl.addEventListener("input", () => {
      if ((nameInputEl.value.length > 0) && (commentTextEl.value.length > 0)) {
          writeButtonEl.removeAttribute("disabled");
          writeButtonEl.classList.remove("error-btn");
      }
  });

  commentTextEl.addEventListener("input", () => {
      if ((nameInputEl.value.length > 0) && (commentTextEl.value.length > 0)) {
          writeButtonEl.removeAttribute("disabled");
          writeButtonEl.classList.remove("error-btn");
          return;
      }
  });

  writeButtonEl.addEventListener("click", () => {
      nameInputEl.classList.remove("error");
      commentTextEl.classList.remove("error");
    
      if ((nameInputEl.value.length < 0) && (commentTextEl.value.length < 0)) {
          nameInputEl.classList.add("error");
          commentTextEl.classList.add("error");
          writeButtonEl.classList.add("error-btn");
          writeButtonEl.disabled === true;
          return;
        } else if ((nameInputEl.value.length < 0) && (commentTextEl.value.length > 0)) {
          nameInputEl.classList.add("error");
          return;
        } else if ((nameInputEl.value.length > 0) && (commentTextEl.value.length < 0)) {
          commentTextEl.classList.add("error");
          return;
        } else {
          addComment({ token, 
            name: nameInputEl.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"), 
            text: commentTextEl.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;") })
            .then(() => {
              return fetchUsersAndRender();
            })
            .then(() => {
              document.getElementById("add").classList.remove('hidden');
              document.getElementById("load").classList.add('hidden');
            })
            .then(() => {
              nameInputEl.value = "";
              commentTextEl.value = "";
              writeButtonEl.setAttribute("disabled", true);
              writeButtonEl.classList.add("error-btn");
            })
            .catch((error) => {
              if (error.message === "Сервер сломался") {
                alert("Сервер сломался, попробуй позже");
                console.log(error);
                return;
              } else if (error.message === "Плохой запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
                document.getElementById("add").classList.remove('hidden');
                document.getElementById("load").classList.add('hidden');
                nameInputEl.classList.add("error");
                commentTextEl.classList.add("error");
                return;
              } else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                console.log(error);;
                return;
              }
            });
      };

  });

  deleteButtonEl.addEventListener("click", () => {
    users.splice(-1, 1);
      renderApp();
  });

  initLikeButton(users);
  replyТoСomment(commentTextEl);
};
renderApp();




