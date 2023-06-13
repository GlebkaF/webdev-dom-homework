import { renderComments } from "./render.js";
import {
  comments,
  formatDate,
  nameInputElement,
  textInputElement,
  buttonElement,
} from "./variables.js";

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

function getPromise() {
  fetch("https://wedev-api.sky.pro/api/v1/qwitchers/comments", {
    method: "GET",
  }).then((response) => {
    getAppComments(response, comments);
  });
}

function getPost() {
  fetch("https://wedev-api.sky.pro/api/v1/qwitchers/comments", {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      text: textInputElement.value,
      forceError: true,
    }),
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

export { getPromise, getPost };
