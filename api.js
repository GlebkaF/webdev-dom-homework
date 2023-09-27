import { renderComments } from "./render.js";

const commentsUrl =
  "https://wedev-api.sky.pro/api/v2/anastasija-peliak/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";
const userRegistr = "https://wedev-api.sky.pro/api/user";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export function fetchComments() {
  //document.querySelector(".comments").textContent = "Комментарии загружаются";

  return fetch(commentsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((response) => {
      const appComments = response.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          likes: comment.likes,
          isLiked: false,
          text: comment.text,
        };
      });

      renderComments(appComments);
    });
}
export function postComment() {
  const commentTextInput = document.querySelector(".add-form-text");
  const commentNameInput = document.querySelector(".add-form-name");
  const addButton = document.querySelector(".add-form-button");
  return fetch(commentsUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: commentTextInput.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        .replaceAll("QUOTE_END", "</div>"),
      name: commentNameInput.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        .replaceAll("QUOTE_END", "</div>"),
      forceError: true,
    }),
  })
    .then((response) => {
      console.log(response);
      if (response.status === 400) {
        throw new Error("Неверный запрос");
      }
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }
      if (response.status === 201) {
        return response.json();
      }
    })
    .then(() => {
      fetchComments();
    })

    .then(() => {
      addButton.disabled = false;
      addButton.textContent = "Написать";
      commentNameInput.value = "";
      commentTextInput.value = "";
    })

    .catch((error) => {
      addButton.disabled = false;
      addButton.textContent = "Написать";
      console.warn(error);
      console.log(error);
      if (error.message === "Неверный запрос") {
        alert("Короткое имя или текст комментария, минимум 3 символа");
      }
      if (error.message === "Ошибка сервера") {
        alert("Сломался сервер , попробуйте позже");
      }
      if (window.navigator.onLine === false) {
        alert("Проблемы с интернетом, проверьте подключение");
      }
    });
}

export function login({ login, password }) {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    return response.json();
  });
}

export function register({ login, password, name }) {
  return fetch(userRegistr, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
    }),
  }).then((response) => {
    return response.json();
  });
}
