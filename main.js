import { fetchComments, postComment } from "./api.js";

const commentNameInput = document.querySelector(".add-form-name");
const commentTextInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");


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
