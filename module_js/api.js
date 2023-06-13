import {
  comments,
  formatDate,
  nameInputElement,
  textInputElement,
} from "./variables.js";
import { renderComments } from "./render.js";

const getAppComments = () => {
  let appComments = comments.map((comment) => {
    return {
      name: comment.author.name,
      date: formatDate(comment.date),
      text: comment.text,
      likes: "0",
      isLiked: false,
    };
  });
  return appComments;
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
      } else if (response.status === 400 ) {
        throw new Error("Плохой запрос");
      } else {
        throw new Error("Сервер упал");
      }
    })
    .then((responseData) => {
      comments = responseData.comments;
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
      getPost();
      getPromise();
    });
}



export { getPromise, getPost };
