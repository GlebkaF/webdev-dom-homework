import { formEl, formLoader } from "./main.js";

let isLoading = false;
export const comLoader = document.getElementById("com-loader");

export function fetchGet() {
  isLoading ? (comLoader.hidden = true) : (comLoader.hidden = false);

  return fetch("https://wedev-api.sky.pro/api/v1/:vich/comments", {
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
  formEl.classList.add("add-form_displayNone");
  formLoader.hidden = false;
  isLoading = true;
  return fetch("https://wedev-api.sky.pro/api/v1/:vich/comments", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      text: text,
      //forceError: true,
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
