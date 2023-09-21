import { renderComments } from "./render.js";

export function fetchComments() {
  document.querySelector(".comments").textContent = "Комментарии загружаются";
  return fetch("https://wedev-api.sky.pro/api/v1/anastasija-pelyak/comments", {
    method: "GET",
  }).then((response) => {
    response.json().then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
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
  });
}
export function postComment() {
  const commentTextInput = document.querySelector(".add-form-text");
  const commentNameInput = document.querySelector(".add-form-name");
  const addButton = document.querySelector(".add-form-button");
  return fetch("https://wedev-api.sky.pro/api/v1/anastasija-pelyak/comments", {
    method: "POST",
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
