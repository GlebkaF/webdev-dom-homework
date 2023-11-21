import { postComments, token, user, setUser, deleteCommentApi } from "./api.js";
import { renderLogin } from "./renderLogin.js";
import { trimValue } from "./validation.js";
import { setError } from "./validation.js";
import { getFetch, users } from "../main.js";
import { isLoginMode } from "./renderLogin.js";
import { userAuthorization } from "./login.js";

export const buttonElement = document.querySelectorAll("add-form-button");
export const listElement = document.getElementById("list");
export const inputTextElement = document.getElementById("comment-input");
export const inputNameElement = document.querySelectorAll("add-form-name");

export const renderUsersOld = (users) => {
  const appHtml = document.getElementById("app");
  const appElement = document.getElementById("app");
  const usersHTML = users
    .map((user, index) => {
      return `<li class="comment" data-index="${index}" >
          <div class="comment-header">
            <div>${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            ${user.text}
              <a class="comment__link" href="#" id="text-button-${
                user.text
              }"></a>
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.likes}</span>
              <button data-index="${index}" class="like-button ${
        user.isLiked ? "-active-like" : "-no-active-like"
      }"></button>
            </div>
          </div>
        </li> `;
    })
    .join("");

  const usersPageHTML = `
    <div class="container">
      <ul id="list" class="comments">
        ${usersHTML}
      </ul>
      ${
        !token
          ? `<p>Для добавления комментария, <a id="login-link" class="add-form-link" href='#'>авторизуйтесь</а></p>`
          : `<div class="add-form">
          <input 
          disabled
            id="name-input"
            class="add-form-name"
            value="${user}"
            type="text"
            placeholder="Введите ваше имя"
          />
          <textarea
            id="comment-input"
            class="add-form-text"
            placeholder="Введите ваш комментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button id="add-button" class="add-form-button">Написать</button>
            <button class="add-form-button" id="delete-button">Удалить</button>
          </div>
        </div>`
      }
    </div>
    </div>
  `;
  appElement.innerHTML = usersPageHTML;

  const linkToLogin = document.getElementById("login-link");
  linkToLogin?.addEventListener("click", () => {
    renderLogin();
  });

  const buttonElement = document.querySelector(".add-form-button");

  buttonElement?.addEventListener("click", () => {
    buttonElement.textContent = "Комментарий добавляется";

    const inputTextElement = document.querySelector(".add-form-text");
    const inputNameElement = document.querySelector(".add-form-name");
    console.log(inputNameElement);

    inputNameElement.classList.remove("error");
    inputTextElement.classList.remove("error");

    if (!trimValue(inputNameElement)) {
      inputNameElement.classList.add("error");
      return;
    }

    if (!trimValue(inputTextElement)) {
      inputTextElement.classList.add("error");
      return;
    }

    if (trimValue(inputNameElement).trim().length < 3) {
      return setError(inputNameElement, "Введенное имя слишком короткое");
    }

    if (trimValue(inputTextElement).trim().length < 3) {
      return setError(inputTextElement, "Ваш комментарий слишком короткий");
    }
    postComments(inputTextElement.value).then(() => {
      buttonElement.textContent = "Написать";
      getFetch();
    });
  });
  function deleteComment() {
    if (!token) return;
    const deleteButtonComment = document.getElementById("delete-button");
    deleteButtonComment.addEventListener("click", () => {
      console.log(token);
      deleteCommentApi({ id: users[users.length - 1].id })
        .then(() => {
          getFetch({ users });
        })
        .catch((error) => {});
    });
  }
  deleteComment();
  console.log(deleteComment);
  attachLikeButtonListener(users, listElement);
  attachTextButtonListener();
};

export const attachLikeButtonListener = () => {
  const likesButtons = document.querySelectorAll(".like-button");
  likesButtons.forEach((likeButton, index) => {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (users[index].isLiked) {
        users[index].likes -= 1;
      } else {
        users[index].likes += 1;
      }
      users[index].isLiked = !users[index].isLiked;
      renderUsersOld(users);
    });
  });
};

export const toggleButton = (buttonElement) => {
  const inputNameElement = document.querySelector(".add-form-name");
  if (
    inputNameElement.value.trim().length >= 3 &&
    inputTextElement.value.trim().length >= 3
  ) {
    buttonElement.disabled = false;
    buttonElement.classList.remove("disabled");
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add("disabled");
  }
};

export const handleEnterKey = () => {
  if (!token) return;
  const inputTextElement = document.querySelector(".add-form-text");
  console.log(inputTextElement);
  inputTextElement.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (
        inputNameElement.value.trim() !== "" &&
        inputTextElement.value.trim() !== ""
      ) {
        buttonElement.click();
      }
    }
  });
};

export const attachTextButtonListener = () => {
  const commentElement = document.querySelectorAll("comment");
  const inputTextElement = document.getElementById("comment-input");
  commentElement.forEach((comment, index) =>
    comment.addEventListener(
      ("click",
      (event) => {
        event.stopPropagation();
        inputTextElement.value = users[index].name + "\n" + users[index].text;
        inputTextElement.style.whiteSpace = "pre-line";
      })
    )
  );
};

export const showLoadingIndicator = () => {
  const loaderElement = document.querySelector(".api-loader");
  console.log(loaderElement);
  loaderElement.classList.remove("hidden");
};
export const hideLoadingIndicator = () => {
  const loaderElement = document.querySelector(".api-loader");
  loaderElement.classList.add("hidden");
};
