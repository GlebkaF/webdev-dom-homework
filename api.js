import { comLoader, formLoader } from "./renderLoader.js";

const commentsURL = "https://wedev-api.sky.pro/api/v2/:bvich/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";

export let token;
export const setToken = (newToken) => {
  token = newToken;
};

export let isLoading;
export const setLoading = (newLoading) => {
  isLoading = newLoading;
};



export function fetchGet() {
  isLoading = true;
  //comLoader();
  console.log("fetchGet");
  return fetch(commentsURL, {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      }
      return response;
    })
    .then((response) => {
      return response.json();
    });
}

export function fetchPost({ name, text }) {
  isLoading = true;
  formLoader();
  //const formEl = document.getElementById("add-form");
  //formEl.classList.add("add-form_displayNone");
  return fetch(commentsURL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      name: name,
      text: text,
      forceError: true,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Неправильный запрос");
      }
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      }
      return response;
    })
    .then((response) => {
      return response.json();
    });
}

export function login({ login, password }) {
  return fetch(userURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Нет авторизации");
      }
      return response;
    })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      if (error.message === "Нет авторизации") {
        alert("Неверный логин или пароль");
        console.warn(error);
      }
    });
}
