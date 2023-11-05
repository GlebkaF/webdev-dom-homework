"use strict";
import { trimValue, setError, resetButtonState } from "./modules/validation.js";
import {
  getComments,
  postComments,
  inputTextElement,
  inputNameElement,
} from "./modules/api.js";

import { currentDate, handleEnterKey, toggleButton } from "./modules/utils.js";
import { listElement, buttonElement, renderUsers } from "./modules/render.js";
import { userAuthorization } from "./modules/login.js";
import { renderLogin } from "./modules/renderLogin.js";

userAuthorization();

export let users = [];

export function getUsers() {
  return users;
}

// export const users = (newUsers) => {
//   users = newUsers;
// };

export function getFetch() {
  showLoadingIndicator();
  hideAddForm();

  getComments().then((responseData) => {
    const appUsers = responseData.comments.map((comment, index) => {
      return {
        name: comment.author.name,
        date: currentDate(new Date(comment.date)),
        likes: comment.likes,
        text: comment.text,
        isLiked: false,
        id: index,
      };
    });

    users = appUsers;
    renderUsers(users, listElement);
  });
}

getFetch();

toggleButton(buttonElement, inputNameElement, inputTextElement);

buttonElement.disabled = false;
buttonElement.textContent = "Написать";
inputNameElement.addEventListener("input", () =>
  toggleButton(buttonElement, inputNameElement, inputTextElement)
);
inputTextElement.addEventListener("input", () =>
  toggleButton(buttonElement, inputNameElement, inputTextElement)
);

buttonElement.addEventListener("click", () => {
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

  console.log("Начинаем делать запрос");
  resetButtonState(buttonElement, "Ваш комментарий добавляется");

  postComments(currentDate)
    .then(() => {
      return fetchAndRender();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      inputNameElement.value = "";
      inputTextElement.value = "";
    })
    .catch((error) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      alert("Произошла ошибка, повторите попытку позже");
      console.warn(error);
    });

  buttonElement.disabled = true;
  buttonElement.classList.add("disabled");
});
fetchAndRender();

handleEnterKey();
