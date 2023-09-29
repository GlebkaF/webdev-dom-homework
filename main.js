import { addComment, handleLikeButtonClick, deleteLastComment, displayComments } from './comment.js';
import { fetchComments } from './API.js';

const addCommentButton = document.getElementById("add-comment-button"); 
const deleteCommentButton = document.getElementById("deleteCommentButton");

const comments = await fetchComments();


fetchComments ();

displayComments (comments);

handleLikeButtonClick ();

deleteCommentButton.addEventListener("click", () => {
  deleteLastComment();
});



addCommentButton.addEventListener("click", () => {
  addComment();
});


