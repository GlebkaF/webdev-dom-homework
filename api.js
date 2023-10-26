import { sanitizeHtml } from "./sanitizeHtml.js";

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/elena-vakulenko/comments", {
        method: "GET"
      })
      .then((response) => {
        return response.json();
      })
}

export function postComment() {
    return fetch("https://wedev-api.sky.pro/api/v1/elena-vakulenko/comments", {
        method: "POST",
        body: JSON.stringify({
          text: sanitizeHtml(commentInputElement.value),
          name: sanitizeHtml(nameInputElement.value),
          forceError: true,
          }),
        })
        .then((response) => {
          console.log(response);
          if (response.status === 500) {
            throw new Error('Сервер сломался, попробуй позже');
          } if (response.status === 400) {
            throw new Error('Имя и комментарий должны быть не короче 3 символов');
          } else {
          return response.json();
          }
        })
}