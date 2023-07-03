import { sendComment } from "./option.js";
import { getAppComments } from "./appComments.js";
import { token } from "./login_components.js";
import { comments } from "./main.js";

export function getPromise() {
  return fetch("https://wedev-api.sky.pro/api/v2/qwitchers/comments", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    getAppComments(response, comments);
  });
}

export function getPost() {
  return fetch("https://wedev-api.sky.pro/api/v2/qwitchers/comments", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      name: nameInputElement.value,
      text: textInputElement.value,
      forceError: true,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        textInputElement.classList.remove("error");
        nameInputElement.classList.remove("error");
        return response.json();
      } else if (response.status === 400) {
        throw new Error("Плохой запрос");
      } else {
        throw new Error("Сервер упал");
      }
    })
    .then(() => {
      addFormElement.classList.add("disnone");
      loadingListElement.classList.remove("disnone");
      textInputElement.value = "";
      nameInputElement.value = "";

      getPromise();
    })
    .catch((error) => {
      addFormElement.classList.add("disnone");
      loadingListElement.classList.remove("disnone");
      if (error.message === "Плохой запрос") {
        return alert("Слишком короткое имя или текст");
      }
      if (error.message === "Сервер упал") {
        sendComment();
      }
    });
}

export function loginUser(login, password) {
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

export function regUser(login, password, name) {
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
