import { comLoader } from "./renderLoader.js";
//import { formLoader, comLoader } from "./renderComments.js";


const commentsURL = "https://wedev-api.sky.pro/api/v2/:azinkevich/comments";
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
  comLoader();

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
  //formLoader.hidden = false;
  isLoading = true;
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
  }).then((response) => {
      return response.json();
  });
}