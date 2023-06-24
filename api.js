"use strict";

// Импорт данных из модулей
import {  DateFormatComment, comments } from './script.js'
import { renderComments } from './render.js';

// Адерес нового сервера (V2)
// ссылка на иструкцию к апи комментов
// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/v2/%5Bkey%5D/comments/README.md
const host = 'https://wedev-api.sky.pro/api/v2/alexey-tsukanov/comments';

let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';

//  Получаем данные из API(Сервера)
function fetchAndRenderComments() {
  return fetch(
    host,
    {
      method: 'GET',
    })
    .then((response) => {
      convertServer(response, comments)
    })
}

const convertServer = (response, commentsArr) => {
  return response.json().then((responseData) => {
    commentsArr = responseData.comments;
    commentsArr = commentsArr.map((comment) => {
      return {
        name: comment.author.name,
        date: DateFormatComment(comment.date),
        textComment: comment.text,
        likes: comment.likes,
        isActiveLike: false,
      }
    });
    renderComments(commentsArr);
  })
}

// Фукнция поторного вызова в случае ошибки от сервера
const postComment = () => {

  // Защащаем ввод данных
  const protectionHtml = (string) => {
    return string
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
  };

  // Добавляем новый комменрарий в API
  return fetch(
    host,
    {
      method: 'POST',
      body: JSON.stringify(
        {
          text: protectionHtml(elementComment.value),
          name: protectionHtml(elementName.value),
          headers: {
            Authorization: token,
          }
        })
    })
    .then((response) => {
      if (response.status === 201) {
        elementName.classList.remove('error');
        elementComment.classList.remove('error');
        return response.json()
      } 
      // if (response.status === 400) {
      //   throw new Error("Плохой запрос")
      // } else {
      //   throw new Error('Сервер не отвечает')
      // }
    })
    .then(() => {
      elementName.value = '';
      elementComment.value = '';
      buttonElement.disabled = true;
      fetchAndRenderComments();
    })
    .catch((error) => {
      loadingCommentElement.style.display = 'none';
      addFormElement.style.display = 'flex';
      if (error.message === "Плохой запрос") {
        elementComment.classList.add('error');
        elementName.classList.add('error');
        alert('Вы ввели слишком короткое имя или текст комментария')
      } if (error.message === "Сервер не отвечает") {
        postComment();
        fetchAndRenderComments();
      }
    })
};

// Экспорт данных в модули
export { fetchAndRenderComments, postComment };