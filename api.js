import { fetchComments } from "./fetchComments.js";
import { renderComments } from "./renderComments.js";
import { renderLogin } from "./renderLogin.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { comments } from "./fetchComments.js";

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

export let token;
export const setToken = (newtoken) => {
  token = newtoken;
}

export let user;
// console.log(user);
export const setUser = (newUser) => {
  user = newUser;
}

export function getComments() {
  return fetch("https://wedev-api.sky.pro/api/v2/elena-vakulenko/comments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        token = prompt('Введите верный пароль');
        getComments();
        throw new Error('Вы не авторизованы');
      }
      return response.json();
    })
}
// renderLogin({ fetchComments });
// fetchComments();

export function postComment({ comm }) {
    return fetch("https://wedev-api.sky.pro/api/v2/elena-vakulenko/comments", {
    method: "POST",
    body: JSON.stringify({
      text: sanitizeHtml(comm),
      // name: sanitizeHtml(nameInputElement.value),
      // forceError: true,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.status === 500) {
        throw new Error('Сервер сломался, попробуйте позже');
      } if (response.status === 400) {
        throw new Error('Введено менее трех символов');
      } 
        return response.json();
    })
}

export function login({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error('Сервер сломался, попробуйте позже');
    } if (response.status === 400) {
      alert('Введены неверные логин или пароль')
      throw new Error('Введены неверные логин или пароль');
    }
    return response.json();
  })
}