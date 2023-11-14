import { inputTextElement, inputNameElement } from "./renderOptional.js";
import { token } from "./api.js";
import { renderLogin } from "./renderLogin.js";
import { trimValue } from "./validation.js";
import { setError } from "./validation.js";

export const renderUsersOld = (users) => {
  console.log("123");
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
          ? `<p>Для добавления комментария, <a id="login-link" class="add-form-link" href='#'>зарегистрируйтесь</а></p>`
          : `<div class="add-form">
          <input 
            id="name-input"
            class="add-form-name"
            value=""
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
          </div>
        </div>`
      }
      <div class="comment-loader hidden">
        <span>Comment is being posted</span>
      </div>
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
    console.log(token);
    console.log(buttonElement);
    const inputTextElement = document.querySelector(".add-form-text");
    const inputNameElement = document.querySelector(".add-form-name");
    console.log(inputTextElement);

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
    console.log(trimValue);

    if (trimValue(inputNameElement).trim().length < 3) {
      return setError(inputNameElement, "Введенное имя слишком короткое");
    }

    if (trimValue(inputTextElement).trim().length < 3) {
      return setError(inputTextElement, "Ваш комментарий слишком короткий");
    }
  });
};

export const toggleButton = (buttonElement) => {
  const inputNameElement = document.querySelector(".add-form-name");
  console.log(inputNameElement);
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

export const attachTextButtonListener = (user) => {
  const commentElement = document.getElementById(`comment-${index}`);
  commentElement.addEventListener("click", (event) => {
    event.stopPropagation();
    inputTextElement.value = user.name + "\n" + user.text;
    inputTextElement.style.whiteSpace = "pre-line";
  });
};

export const attachLikeButtonListener = (user, users, listElement) => {
  const likesButton = document.querySelectorAll(`like-button-${index}`);
  likesButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (user.isLiked) {
      user.likes -= 1;
    } else {
      user.likes += 1;
    }
    user.isLiked = !user.isLiked;
    renderUsers(users, listElement);
  });
};
