"use strict";
import { trimValue, setError, resetButtonState } from "./modules/validation.js";
import {
  getComments,
  postComments,
  inputTextElement,
  inputNameElement,
} from "./modules/api.js";

import { currentDate, handleEnterKey, toggleButton } from "./modules/utils.js";
import {
  listElement,
  buttonElement,
  attachTextButtonListener,
  attachLikeButtonListener,
  renderUsers,
} from "./modules/render.js";

let users = [];
// 1.вынести все запросы в отдельный модуль
// 2. вынести рендер функцию (+обрабочики внутри)
// 3.
//

const fetchAndRender = () => {
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
};

toggleButton(buttonElement, inputNameElement, inputTextElement);

// const setError = (element, message) => {}
// const resetButtonState = (buttonElement, value) => {}

//   if (trimValue(inputNameElement).length < 3) {
//     return setError(inputNameElement, "Введенное имя слишком короткое");
//   }

//   if (trimValue(inputTextElement).length < 3) {
//     return setError(inputTextElement, "Ваш комментарий слишком короткий");
//   }

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