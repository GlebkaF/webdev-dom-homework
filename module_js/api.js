import { renderComments } from "./render.js";
import {
  comments,
  formatDate,
  nameInputElement,
  textInputElement,
  buttonElement,
} from "./variables.js";

const host = "https://wedev-api.sky.pro/api/v2/aleksey-bateha/comments";

const getAppComments = (response, array) => {
  return response.json().then((responseData) => {
    array = responseData.comments;
    array = array.map((comment) => {
      return {
        name: comment.author.name,
        date: formatDate(comment.date),
        text: comment.text,
        likes: "0",
        isLiked: false,
      };
    });
    renderComments(array);
  });
};

function getPromise(token) {
  fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    getAppComments(response, comments);
  });
}

function getPost(token) {
  fetch(host, {
    method: "POST",
    body: JSON.stringify({
      text: textInputElement.value,
    }),
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error("Плохой запрос");
      } else {
        throw new Error("Сервер упал");
      }
    })
    .then(() => {
      textInputElement.value = "";
      nameInputElement.value = "";

      getPromise();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
    })
    .catch((error) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      if (error.message === "Плохой запрос") {
        return alert("Слишком короткое имя или текст");
      }
      if (error.message === "Сервер упал") {
        getPost();
        getPromise();
      }
    });
}

export function addLogin(login, password) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

export function registerUser(login, password, name) {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export { getPromise, getPost };
