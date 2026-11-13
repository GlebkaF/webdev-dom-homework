import { commentsRender } from "./render.js";
import { comments } from "./data.js";

const commentInput = document.querySelector(".add-form-name");
const commentText = document.querySelector(".add-form-text");
const commentBtn = document.querySelector(".add-form-button");

export const postFetchFunction = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/malika_919/comments", {
    method: "POST",
    body: JSON.stringify({
      name: commentInput.value,
      text: commentText.value,
      forceError: true,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("name должен содержать хотя бы 3 символа");
        }
        if (response.status === 500) {
          throw new Error("Сервер упал, попробуйте позже");
        }
        throw new Error("Проверьте соединение");
      } else if (response.ok) {
        return response.json();
      }
    })
    .then(() => {
      commentInput.value = "";
      commentText.value = "";
      commentBtn.disabled = false;
      commentBtn.textContent = "Написать";
      getComments();
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        alert("Сервер упал, попробуйте позже");
      } else {
        alert(error.message);
      }
      commentBtn.disabled = false;
      commentBtn.textContent = "Написать";
    });
};

export const getComments = () => {
  fetch("https://wedev-api.sky.pro/api/v1/malika_919/comments")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      comments.length = 0; // Очищаем старый массив
      comments.push(...data.comments); // Добавляем новые
      commentsRender();
    })
    .catch(() => {
      alert("Ошибка загрузки. Проверьте интернет");
    });
};
