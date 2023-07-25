"use strict";

import { getComments, postComments, repeatPostComments } from "./api.js";
import { checkFields } from "./checkFields.js";
import { clickForAnswer } from "./clickForAnswer.js";
import { getCorrectComments } from "./getCorrectComments.js";
import { getLikes } from "./getLikes.js";
//import { renderLogin } from "./renderLogin.js";
import { renderComments } from "./renderComments.js";
import { format } from "date-fns";

let comments = [];

//Берем комментарии из API
export const getTodo = (showLoading = true) => {
  const loadElement = document.querySelector(".load-text");
  // nameElement.disabled = true;
  // commentElement.disabled = true;

  if (showLoading) {
    loadElement.textContent = "Подождите, комментарии загружаются...";
  } else {
    loadElement.textContent = "";
  }

  getComments()
    .then((answerData) => {
      //console.log(answerData);
      //Преобразовываем данные из формата API в формат ленты
      const appComments = answerData.comments.map((comment) => {
        const now = new Date();
        format(now, "dd-MM-yyyy HH:mm:ss");
        const createDate = format(
          new Date(comment.date),
          "dd-MM-yyyy HH:mm:ss"
        );

        return {
          name: comment.author.name,
          id: comment.id,
          date: createDate,
          text: comment.text,
          counter: comment.likes,
          isLiked: comment.isLiked,
          isEdit: false,
        };
      });

      comments = appComments;
      renderComments({ comments });
    })
    .then((data) => {
      // nameElement.disabled = false;
      // commentElement.disabled = false;
      loadElement.textContent = "";
    })
    .catch((error) => {
      console.error(error);
      alert("Проверьте Ваше подключение к интернету");
    });
};

renderComments({ comments });
clickForAnswer({ comments, renderComments });
getCorrectComments({ comments, renderComments });
getLikes({ comments, renderComments });
checkFields();

//Функция для повторной отправки комментария при ошибке 500
const repeatAddTodo = ({
  commentElement,
  nameElement,
  commentBodyElement,
  loadBodyElement,
  buttonElement,
}) => {
  repeatPostComments({
    text: commentElement.value,
    name: nameElement.value,
  })
    .then((responseData) => {
      console.log(responseData);
      return getTodo(false);
    })
    .then((data) => {
      //После нажатия на кнопку поля становятся пустыми, кнопка не активна.
      nameElement.value = "";
      commentElement.value = "";
      buttonElement.disabled = true;

      commentBodyElement.style.display = "";
      loadBodyElement.textContent = "";
    })
    .catch((error) => {
      commentBodyElement.style.display = "block";
      loadBodyElement.textContent = "";
    });
};

//Добавляет комментарий, функция с цепочкой промиссов
export const addTodo = ({
  commentElement,
  nameElement,
  commentBodyElement,
  loadBodyElement,
  buttonElement,
}) => {
  // buttonElement.disabled = true;
  // buttonElement.textContent = 'Загружаем комментарий...';

  commentBodyElement.style.display = "none";
  loadBodyElement.textContent = "Загружаем комментарий...";

  postComments({
    text: commentElement.value,
    name: nameElement.value,
  })
    .then((responseData) => {
      console.log(responseData);
      return getTodo(false);
    })
    .then((data) => {
      //После нажатия на кнопку поля становятся пустыми, кнопка не активна.
      nameElement.value = "";
      //commentElement.value = '';
      buttonElement.disabled = true;

      // buttonElement.disabled = false;
      // buttonElement.textContent = 'Написать';

      commentBodyElement.style.display = "";
      loadBodyElement.textContent = "";
    })
    .catch((error) => {
      commentBodyElement.style.display = "block";
      loadBodyElement.textContent = "";
      console.error(error);
      if (error.message === "Неправильный ввод") {
        alert("Имя и комментарий должны содержать минимум 3 символа");
      } else if (error.message === "Сервер сломался") {
        repeatAddTodo({
          commentElement,
          nameElement,
          commentBodyElement,
          loadBodyElement,
          buttonElement,
        });
      } else {
        alert("Что-то пошло не так...");
      }
    });
};

console.log("It works!");
getTodo();
renderComments({ comments });
// deleteComment({ id })
//renderLogin({ getTodo });
