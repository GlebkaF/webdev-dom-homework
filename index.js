
"use strict";

const comments = document.querySelector(".comments");
const addFormBtn = document.querySelector(".add-form-button");
const inputName = document.querySelector(".add-form-name");
const inputText = document.querySelector(".add-form-text");

const plusZero = (str) => {
  if (str < 10) return `0${str}`;
};

const now = (currentDate) => {
  let date = plusZero(currentDate.getDate());
  let month = plusZero(currentDate.getMonth());
  let hours = plusZero(currentDate.getHours());
  let mins = plusZero(currentDate.getMinutes());
  return `${date}.${month}.${currentDate.getFullYear() % 100} ${hours}:${mins}`;
};

inputName.addEventListener("focus", () => {
  inputName.classList.remove("error");
});

inputText.addEventListener("focus", () => {
  inputText.classList.remove("error");
});

addFormBtn.addEventListener("click", () => {
  if (inputName.value === "") {
    inputName.classList.add("error");
    return;
  }

  if (inputText.value === "") {
    inputText.classList.add("error");
    return;
  }

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
});