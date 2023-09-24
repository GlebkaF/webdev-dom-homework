import { addComment, handleLikeButtonClick, deleteComment, fetchComments } from './comment.js';

const addCommentButton = document.getElementById("add-comment-button");
const deleteCommentButton = document.getElementById("deleteCommentButton");

addCommentButton.addEventListener("click", () => {
  addComment();
});

const commentsList = document.getElementById("comments-list");
commentsList.addEventListener("click", (event) => {
  const target = event.target;  
  if (target.classList.contains("like-button")) {
    handleLikeButtonClick(target);
  }
});

fetchComments();
