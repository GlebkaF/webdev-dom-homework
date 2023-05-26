
const commentsElement = document.getElementById("comments");
const userNameElement = document.getElementById("userName");
const userCommentElement = document.getElementById("userComment");
const addCommentElement = document.getElementById("addComment");
const deleteCommentElement = document.getElementById("deleteComment");
const likeElement = document.getElementById("like");
const inputEnter = document.querySelector('.add-form');
const formElement = document.getElementById("form");
const timeLoadElement = document.getElementById("timeLoad");

import { checkAndAdd, getComments } from "./api.js";
import { renderComments} from "./render.js";




let arrComments = [];
getComments(arrComments, commentsElement).then((response) => {
    timeLoadElement.style.display = "none"
  });

renderComments(arrComments,commentsElement);

// checkAndAdd(arrComments, commentsElement, addCommentElement, formElement);


document.getElementById("formContain").addEventListener("click", event => {
  if (event.target.className === "add-form-button") checkAndAdd(arrComments, commentsElement, addCommentElement);
});

inputEnter.addEventListener('keyup', function(event){
  if (event.key === "Enter") {
    checkAndAdd();
  }
});

deleteCommentElement.addEventListener("click", () => {
  commentsElement.removeChild(commentsElement.lastElementChild);
})