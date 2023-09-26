import { addComment, handleLikeButtonClick, deleteLastComment, displayComments } from './comment.js';
import { fetchComments } from './API.js';

const addCommentButton = document.getElementById("add-comment-button"); 
const deleteCommentButton = document.getElementById("deleteCommentButton");

addCommentButton.addEventListener("click", () => {
  addComment(); 
});

handleLikeButtonClick ();
deleteCommentButton.addEventListener("click", () => {
  deleteLastComment();
});

const comments = await fetchComments();

displayComments (comments);

