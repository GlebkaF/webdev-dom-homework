import { fetchComments } from "./api.js";
import { renderComments } from "./render.js";

const commentNameInput = document.querySelector(".add-form-name");
const commentTextInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");
const commentsBox = document.querySelector(".comments");
const newDate = new Date().toLocaleString().slice(0, -3);

fetchComments();

addButton.addEventListener("click", () => {
  commentNameInput.classList.remove("error");

  if (commentNameInput.value === "") {
    commentNameInput.classList.add("error");
    return;
  }
  if (commentTextInput.value === "") {
    commentTextInput.classList.add("error");
    return;
  }
  postComment();

  addButton.disabled = true;
  addButton.textContent = "Комментарий добавляется";

  commentNameInput.value = "";
  commentTextInput.value = "";
});
