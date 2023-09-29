import { addComment, handleLikeButtonClick, deleteLastComment, displayComments } from './comment.js';
import { fetchComments, } from './API.js';
import { renderLogin } from './login.js';

async function initialize() {
  renderLogin();
  const comments = await fetchComments();
  displayComments(comments);
}

initialize();

const addCommentButton = document.getElementById("add-comment-button");
const deleteCommentButton = document.getElementById("deleteCommentButton");

deleteCommentButton.addEventListener("click", () => {
  deleteLastComment();
});

addCommentButton.addEventListener("click", () => {
  addComment();
});

handleLikeButtonClick();
