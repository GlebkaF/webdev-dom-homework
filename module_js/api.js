import { renderComments } from "./render.js";
import {
  comments,
  formatDate,
  nameInputElement,
  textInputElement,
  buttonElement,
} from "./variables.js";

export let token =
  "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

token = null;

const host = "https://wedev-api.sky.pro/api/v2/aleksey-bateha/comments";

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
    document.getElementById("login-button").addEventListener("click", () => {
      token =
        "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
      getPromise();
    });
  });
};

function getPromise() {
  fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    getAppComments(response, comments);
  });
}

function getPost() {
  fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      text: textInputElement.value,
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
