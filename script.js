"use strict";

const buttonElement = document.getElementById('comment-button');
const nameElement = document.getElementById('comment-author');
const textElement = document.getElementById('comment-text');
const listComments = document.getElementById("comments");

buttonElement.addEventListener("click", () => {
    nameElement.classList.remove("error");
    textElement.classList.remove("error");
    buttonElement.classList.remove("error-for-button");
    console.log('Button is pressed')
    if (nameElement.value === "" && textElement.value === "") {
        nameElement.classList.add("error");
        textElement.classList.add("error");
        buttonElement.classList.add("error-for-button");
        return;
    };
    let commentDate = new Date();
    const oldComments = listComments.innerHTML;
    listComments.innerHTML =
        oldComments +
        `<li class="comment">
        <div class="comment-header">
          <div>${nameElement.value}</div>
          <div>${commentDate.getDay()}.${commentDate.getMonth()}.${commentDate.getFullYear()} ${commentDate.getHours()}:${commentDate.getMinutes()}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${textElement.value}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">0</span>
            <button class="like-button"></button>
          </div>
        </div>
      </li>`;
});

console.log("It works!");