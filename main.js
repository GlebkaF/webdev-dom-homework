"use strict";

// Код писать здесь

import { getCurrentDate } from "./date.js";
import renderComments from "./renderComments.js";
import { fetchGet, fetchPost } from "./api.js";
import { getListComments } from "./listComments.js";

const buttonElement = document.getElementById("add-form-button");
export const commentsElement = document.getElementById("comments-list");
export const nameInputElement = document.getElementById("name-input");
export const textareaInputElement = document.getElementById("textarea-input");
const currentDate =
  new Date().toLocaleDateString("default", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }) +
  " " +
  new Date().toLocaleTimeString().slice(0, -3);

const commentsLoader = document.querySelector(".comments-loading"); //  Wait please, comments are being loaded...
const commentsLoading = document.querySelector(".comment-loader"); // Comment is being loaded...

// массив данных с комментариями
let comments = [];

commentsLoading.style.display = "none";

function fetchArrPromise() {
  fetchGet().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: getCurrentDate(new Date(comment.date)),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });

    comments = appComments;
    return renderComments(comments, getListComments);
  });
}

fetchArrPromise(fetchGet);
commentsLoader.style.display = "none";

// получение и обработка событий для кнопок like
export function getLikeButton() {
  const likesButton = document.querySelectorAll(".like-button");

  for (const like of likesButton) {
    like.addEventListener("click", () => {
      const likeIndex = like.dataset.index;
      const commentsElement = comments[likeIndex];

      if (commentsElement.currentLike) {
        commentsElement.likes -= 1;
        commentsElement.currentLike = false;
        like.classList.add("-no-active-like");
        like.classList.remove("-active-like");
        renderComments(comments, getListComments);
      } else {
        commentsElement.likes += 1;
        commentsElement.currentLike = true;
        like.classList.add("-active-like");
        like.classList.remove("-no-active-like");
        renderComments(comments, getListComments);
      }
    });
  }
}
getLikeButton();

// рендер функция для преобразования массива в html разметку
// const renderComments = () => {
//   const commentsHtml = comments
//     // const commentsHtml = appComments
//     .map((comment, index) => {
//       return `<li class="comment">
//       <div class="comment-header">
//         <div>${comment.name}</div>
//         <div>${comment.date}</div>
//       </div>
//       <div class="comment-body">
//         <div class="comment-text">
//           ${comment.text}
//         </div>
//       </div>
//       <div class="comment-footer">
//         <div class="likes">
//           <span class="likes-counter"> ${comment.likes}</span>
//           <button data-index="${index}" class="like-button ${
//         comment.currentLike ? "-active-like" : ""
//       }"></button>
//         </div>
//       </div>
//     </li>`;
//     })
//     .join("");
//   // <button data-index="${index}" class="like-button -no-active-like"></button>
//   commentsElement.innerHTML = commentsHtml;
//   getLikeButton();
// };

// fetchArrPromise();
renderComments(comments, getListComments);

buttonElement.addEventListener("click", () => {
  // добавление обработчика клика на кнопку добавления комментариев и установка даты
  const currentDate =
    new Date().toLocaleDateString("default", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }) +
    " " +
    new Date().toLocaleTimeString().slice(0, -3);

  nameInputElement.classList.remove("error");
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  }

  textareaInputElement.classList.remove("error");
  if (textareaInputElement.value === "") {
    textareaInputElement.classList.add("error");
    return;
  }

  getLikeButton();

  buttonElement.disabled = true;
  commentsLoading.style.display = "block";

  const postFetch = (fetch) => {
    return fetch()
      .then(() => {
        commentsLoading.style.display = "none";
        return fetchArrPromise(fetchGet);
      })
      .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Добавить";
        nameInputElement.value = "";
        textareaInputElement.value = "";
      })
      .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Добавить";

        // обработка упавшего интернета
        alert("Looks like something went wrong.");
        commentsLoading.style.display = "none";
        if (error.message === "Server error") {
          alert("Ooops, the Server has just fallen down. Try a little later.");
          postFetch(fetchPost);
          commentsLoading.style.display = "none";
        } else if (error.message === "Wrong request") {
          alert(
            "The name and/or the comment are too short, minimum length is 3 symbols. Try again later."
          );
          commentsLoading.style.display = "none";
        } else {
          return response.json();
        }
      });
  };

  postFetch(fetchPost);
  renderComments(comments, getListComments);
});

console.log("It works!");
