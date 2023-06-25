"use strict";

// Импорт данных из модулей
import {  DateFormatComment, comments, isPosting } from './script.js'
import { renderComments } from './render.js';


// Адерес нового сервера (V2)
// ссылка на иструкцию к апи комментов
// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/v2/%5Bkey%5D/comments/README.md
const hostV1 = 'https://wedev-api.sky.pro/api';
const hostV2 = 'https://wedev-api.sky.pro/api/v2/alexey-tsukanov/comments';


let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';
token = null;


// Функция позволяющая изменять переменную токен в других модулях прилоения
export const setToken = (newToken) => {
   token = newToken;
};

export const getToken = () => {
  return token
};

//Функция входа по логину 
export const loginUser = (login, password) => {
return fetch(
  `${hostV1}/user/login`,
  {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password
    })
  }
).then((response) => {
  return response.json()
})
}

// функция регистрации юзера
export const regUser = (login, password, name) => {
  return fetch(
    `${hostV1}/user`,
    {
      method: "POST",
      body: JSON.stringify({
        login: login,
        name: name,
        password: password,
      })
    }
  ).then((response) => {
    return response.json()
  })
  }

//  Получаем данные из API(Сервера)
export const fetchAndRenderComments =() =>  {
  const headers = token ? {
    Authorization: `Bearer ${token}`,
  } : {};

  return fetch(
    hostV2,
    {
      method: 'GET',
      headers
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
export const postComment = () => {
  
  // Защащаем ввод данных
  const protectionHtml = (string) => {
    return string
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
  };

  // Добавляем новый комменрарий в API
  const elementComment = document.getElementById('commentInput');
  const elementName = document.getElementById('nameInput');
  return fetch(
    hostV2,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        {
          text: protectionHtml(elementComment.value),
          name: protectionHtml(elementName.value),
        })
    })
    .then((response) => {
      if (response.status === 201) {
        elementName.classList.remove('error');
        elementComment.classList.remove('error');
        return response.json()
      } 
      if (response.status === 400) {
        throw new Error("Плохой запрос")
      } else {
        throw new Error('Сервер не отвечает')
      }
    })
    .then(() => {
      elementName.value = '';
      elementComment.value = '';
      fetchAndRenderComments();
    })
    .catch((error) => {
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

