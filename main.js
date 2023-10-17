"use strict";

import { getComments, postComments } from "./api.js";
import { inputTextElement, inputNameElement } from "./api.js";
import { currentDate } from "./utils.js";
import { renderUsers } from "./render.js";
import { attachTextButtonListener } from "./render.js";
import { attachLikeButtonListener } from "./render.js";
import { toggleButton } from "./utils.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");

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
    users.forEach((user) => {
      attachTextButtonListener(user, users, listElement);
      attachLikeButtonListener(user, listElement);
    });
  });
};

toggleButton(buttonElement,inputNameElement, inputTextElement);

inputNameElement.addEventListener("input", toggleButton);
inputTextElement.addEventListener("input", toggleButton);

buttonElement.addEventListener("click", () => {
  inputNameElement.classList.remove("error");
  inputTextElement.classList.remove("error");

  if (inputNameElement.value.trim() === "") {
    inputNameElement.classList.add("error");
    return;
  }

  if (inputTextElement.value.trim() === "") {
    inputTextElement.classList.add("error");
    return;
  }
  if (inputNameElement.value.trim().length < 3) {
    inputNameElement.classList.add("error");
    return alert("Введенное имя слишком короткое");
  }

  if (inputTextElement.value.trim().length < 3) {
    inputTextElement.classList.add("error");
    return alert("Ваш комментарий слишком короткий");
  }

  const startAt = Date.now();
  console.log("Начинаем делать запрос");
  buttonElement.disabled = true;
  buttonElement.textContent = "Ваш комментарий добавляется...";

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
