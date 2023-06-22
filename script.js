"use strict";
console.log("It works!");
const buttonElement = document.getElementById("add-button");
const commentElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("error")
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  };

  textInputElement.classList.remove("error")
  if (textInputElement.value === "") {
    textInputElement.classList.add("error");
    return;
  };

  const oldCommentHtml = commentElement.innerHTML;

  function formatDate(myDate) {
    let date = myDate.getDate();
    let month = myDate.getMonth() + 1;
    let hour = myDate.getHours();
    let minute = myDate.getMinutes();

    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + (month + 1);
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return `${date}.${month}.${myDate.getFullYear().toString().substr(-2)} ${hour}:${minute}`;
  }

  commentElement.innerHTML = oldCommentHtml + `
    <li class="comment">
      <div class="comment-header">
          <div>${nameInputElement.value}</div>
          <div>${formatDate(new Date())}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${textInputElement.value}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">0</span>
            <button class="like-button"></button>
          </div>
        </div>
      </li>`

      

  nameInputElement.value = "";
  textInputElement.value = "";
});