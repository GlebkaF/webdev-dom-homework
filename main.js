//main.js

import { getTodos, postTodo } from './api.js';
import { format } from "date-fns";
import { renderComments } from './render.js';

const loading = document.getElementById("loading");
const loadingForm = document.getElementById("loadingForm");
const addFormButtonElement = document.getElementById("add-form-button");
let quote = "";

let comments = [
];

loading.textContent = "Комментарии загружаются...";

 export const fetchGet = () => {
  getTodos().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: format(new Date(comment.date), "yyyy-MM-dd HH:mm:ss"),
        text: comment.text,
        likes: 0,
        isLiked: false,
        changeButton: false,
      }
    })
    loading.textContent = "";
    comments = appComments;
    renderAllComments();
  });
};

fetchGet();

const clickLike = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
      likeButton.classList.add('-loading-like');
      function delay(interval = 300) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, interval);
        });
      };
      delay(2000).then(() => {
        const newLike = comments[likeButton.dataset.index];
        newLike.likes = newLike.isLiked
          ? newLike.likes - 1
          : newLike.likes + 1;
        newLike.isLiked = !newLike.isLiked;
        // newLike.isLikeLoading = false;
        renderAllComments();
      });
    })
  }
};

const replyToComment = () => {
  const commentBodys = document.querySelectorAll(".comment-body");
  for (const commentBody of commentBodys) {
    commentBody.addEventListener('click', () => {
      const oldComment = commentBody.dataset.text;
      const oldName = commentBody.dataset.name;
      const quote = `${oldComment}\n${oldName}: `;
      textInputElement.value += `"${quote}"\n`;

    })
  }
};

 export const renderAllComments = () => {
  renderComments({ comments });
  clickLike();
  replyToComment();
}

renderAllComments();
