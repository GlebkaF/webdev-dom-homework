"use strict";

const comments = document.querySelector(".comments");
const addFormBtn = document.querySelector(".add-form-button");
const delFormBtn = document.querySelector(".del-form-button");
const inputName = document.querySelector(".add-form-name");
const inputText = document.querySelector(".add-form-text");

addFormBtn.disabled = true;

document.addEventListener("input", () => {
  inputName.value != "" && inputText.value != ""
    ? (addFormBtn.disabled = false)
    : (addFormBtn.disabled = true);
});

const plusZero = (str) => {
  return str < 10 ? `0${str}` : str;
};

const now = (currentDate) => {
  let date = plusZero(currentDate.getDate());
  let month = plusZero(currentDate.getMonth() + 1);
  let hours = plusZero(currentDate.getHours());
  let mins = plusZero(currentDate.getMinutes());
  return `${date}.${month}.${currentDate.getFullYear() % 100} ${hours}:${mins}`;
};

const renderNewComment = () => {
  let currentDate = new Date();

  comments.innerHTML += `<li class="comment">
      <div class="comment-header">
        <div>${inputName.value}</div>
        <div>${now(currentDate)}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${inputText.value}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>`;

  inputName.value = "";
  inputText.value = "";
  addFormBtn.disabled = true;
  delFormBtn.disabled = false;
};

addFormBtn.addEventListener("click", () => {
  renderNewComment();
});

document.addEventListener("keyup", (e) => {
  if ((e.code === "Enter" || e.code === "NumpadEnter") && !addFormBtn.disabled)
    renderNewComment();
});

delFormBtn.addEventListener("click", () => {
  comments.removeChild(comments.lastElementChild);
  if (!comments.lastElementChild) delFormBtn.disabled = true;
});
