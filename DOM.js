"use strict";
const buttonElement = document.getElementById ("add-form-button");
const listElement = document.getElementById ("list");
const nameInputElement = document.getElementById ("name-input");
const commentInputElement = document.getElementById ("comment-input");

buttonElement.addEventListener("click", () => {
    
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElement.value === '') {
        nameInputElement.classList.add("error");
        return;
    };
    if (commentInputElement.value === '') {
        commentInputElement.classList.add("error");
        return;
    };


    let myDate = new Date(); 
    let day = myDate.getDay();
    let month = myDate.getMonth();
    let year = myDate.getFullYear();
    let hour = myDate.getHours(); 
    let minute = myDate.getMinutes(); 
    if (day < 10) { 
        day = "0" + day; 
    };
    if (month < 10) { 
        month = "0" + month; 
    };
    if (year < 10) { 
        year = "0" + year; 
    };
    if (minute < 10) { 
        minute = "0" + minute; 
    };
    let time = day + "." + month + "." + year + " " + hour + ":" + minute;

    const oldListHtml = listElement.innerHTML;
    listElement.innerHTML = oldListHtml + 
    `<li class="comment">
    <div class="comment-header">
      <div>${nameInputElement.value}</div>
      <div> ${time} </div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${commentInputElement.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`
});

console.log("It works!");