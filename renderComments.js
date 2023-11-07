import { addLikes } from "./addLikes.js";
import { addQuote } from "./addQuote.js";
import { postComment, setUser, token } from "./api.js";
import { renderLogin, renderReg } from "./renderLogin.js";
import { fetchComments } from "./fetchComments.js";

// const commentsElements = document.querySelectorAll(".comments");
// const commentListElement = document.getElementById("comment-list");

export const renderComments = ({ comments, user }) => {
  const appElement = document.getElementById("app");
    const commentsHtml = comments.map((comment, index) => {
      let liked = comment.isLike ? `-active-like` : ``;
      return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.isLike ? `-active-like` : ``} ${comment.isLikeLoading ? `-loading-like` : ``}" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
    })
    .join("");

    const appHtml = `
    <div class="loading-comment">Комментарии загружаются...</div>
    <div class="container">
    <ul id="comment-list" class="comments">${commentsHtml}
    </ul>

    ${token ? `<div class="add-form" id="add">
    <input id="name-input"
      type="text"
      class="add-form-name add-gray" readonly
      placeholder="Админ"
    />
    <textarea id="comment-input"
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      rows="4"
    ></textarea>
    <div class="add-form-row">
      <button id="add-button" class="add-form-button">Написать</button>
    </div>
  </div>` : `<div id="autoriz-ask" class="login-alert">Чтобы добавить комментарий, <span id="autorization"> авторизуйтесь</span></div>`}

  </div>`

  appElement.innerHTML = appHtml;
  
  // addForm.style.display = "none";

  if (!token) {
    const autoriz = document.getElementById("autorization");
    autoriz.addEventListener("click", () => {
      renderLogin({ fetchComments });
    });
  };

  if (token) {
    const buttonElement = document.getElementById("add-button");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  
    buttonElement.addEventListener("click", () => {
      // nameInputElement.classList.remove("error");
      // if(nameInputElement.value === '') {
      //   nameInputElement.classList.add("error");
      //   return;
      // }
    
      commentInputElement.classList.remove("error");
      if(commentInputElement.value === '') {
        commentInputElement.classList.add("error");
        return;
      }
    
      buttonElement.disabled = true;
      buttonElement.textContent = "Комментарий отправляется...";
      
    const postPromise = () => {
    postComment({ comm: commentInputElement.value })
    .then((response) => {
      fetchComments();
      return response;
    })
    .then((response) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      nameInputElement.value = "";
      commentInputElement.value = "";
      return response;
    })
    .catch((error) => {
      if (error.message === 'Сервер сломался, попробуй позже') {
        alert('Сервер сломался, попробуй позже');
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        return;
      }
      if (error.message === 'Имя и комментарий должны быть не короче 3 символов') {
        alert('Имя и комментарий должны быть не короче 3 символов');
        buttonElement.disabled = true;
        buttonElement.textContent = "Написать";
        return;
      }
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      alert('Кажется, у вас сломался интернет, попробуйте позже');
      console.warn(error);
    })
    };
    postPromise();
    });

    addLikes({ comments });
    addQuote({ comments });
  }
  };