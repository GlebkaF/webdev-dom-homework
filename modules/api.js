import { currentDate } from "./utils.js";

// import { renderUsers } from "./render.js";
export function getComments() {
  return fetch("https://wedev-api.sky.pro/api/v1/dima-nosov/comments", {
    method: "GET",
  }).then((response) => {
    return response.json();
  });
}
export const inputTextElement = document.getElementById("comment-input");
export const inputNameElement = document.getElementById("name-input");

export function postComments(date) {
  const commentInfo = {
    text: inputTextElement.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    nick: inputNameElement.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    date: currentDate(date),
  };

  return fetch("https://wedev-api.sky.pro/api/v1/dima-nosov/comments", {
    method: "POST",
    body: JSON.stringify({
      name: commentInfo.nick,

      date: commentInfo.date,
      likes: 0,
      text: commentInfo.text,
      isLiked: false,
      forceError: true,
    }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else {
      return Promise.reject("The server has failed");
    }
  });
}
