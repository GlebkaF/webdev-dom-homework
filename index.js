"use strict";

import { addComment, getComments } from "./api.js";
import { getCommentDate } from "./components/date-component.js";
import { renderListComponent } from "./components/list-and-add-component.js";
import { renderLoginComponent } from "./components/login-component.js";


let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

token = null;

let users = [];
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


// кнопка лайка
const initLikeButton = (users) =>{
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButtonElement of likeButtonElements){
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButtonElement.dataset.index;
      if (users[index].isLiked === false) {
        users[index].likes = users[index].likes + 1;
        users[index].isLiked = true;
      } else {
        users[index].likes = users[index].likes - 1;
        users[index].isLiked = false;
      }
      renderApp();
      }
    )
  }
}

//Ответы на комментарии

const replyТoСomment = (commentTextEl) =>{
  const listElements = document.querySelectorAll(".comment");
  for (const listElement of listElements){
    listElement.addEventListener("click", () => {
      const commentText = listElement.dataset.comment;
      const userName = listElement.dataset.name;
      commentTextEl.value = ">" + " "  + commentText + " " + userName;
    });
    //renderApp();
  }
}

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
      //renderApp();
  });

  initLikeButton(users);
  replyТoСomment(commentTextEl);
};
renderApp();




