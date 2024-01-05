import { objOfConst } from "./constant.js";
import { timeFunction } from "./date.js";
import { renderComments } from "./render.js";
import { addCommentByClick, addCommentByEnter } from "./add.comments.js";
import { disabledFunction } from "./disable.js";

// Принимаем с сервера комментарии

export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/eugene-alyoshin/comments", {
        method: "GET",
    })
    .then((response) => {
        return response.json();
    })
}

// Передаем новые комментарии на сервер

export function postComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/eugene-alyoshin/comments", {
      method: "POST",
      body: JSON.stringify(
        {
            text: objOfConst.commentInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            name: objOfConst.nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            date: timeFunction(),
            likes: objOfConst.comments.likes,
            isLiked: objOfConst.comments.isLiked,
            forceError: true,
        },
      ),
    })
}

// Функция первого рендера страницы

export function fetchAndRender() {
    return getComments()
    .then((responseData) => {
      objOfConst.comments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: timeFunction(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
        };
      });
      return renderComments();
    })
    .then(() => {
      return addCommentByClick();
    })
    .then(() => {
      return addCommentByEnter();
    });
  }

// Функция добавления комментария на сервер и проверки на ошибки

export function fetchPostAndErrors() {
    return postComments().then((response) => {
  
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      } else if (response.status === 400) {
        throw new Error("Неверный запрос");
      } else {
        return response.json();
      } 
    })
    .then(() => {
      return fetchAndRender();
    })
    .then(() => {
      return disabledFunction(false);
    })
    .then(() => {
      objOfConst.nameInputElement.value = "";
      objOfConst.commentInputElement.value = "";
    })
    .catch((error) => {
      disabledFunction(false);
      objOfConst.addingText.style.opacity = "0";
      if (error.message === "Ошибка сервера") {
        alert("Сервер сломался, попробуйте позже");
        console.warn("Код ошибки - 500");
        return;
      } else if (error.message === "Неверный запрос") {
        alert("Имя и комментарий должны быть не короче 3х символов");
        console.warn("Код ошибки - 400");
        return;
      } else {
        alert("Кажется, у Вас проблемы с интернетом");
        console.warn("Нет сети");
        return;
      }

    });
  };