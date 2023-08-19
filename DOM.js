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

    function formatDate(date) {
      const locale = 'ru-RU'
      const options = {year: '2-digit', month: 'numeric', day: 'numeric'};
      return `${date.toLocaleString(locale, options)} ${date.toLocaleTimeString(locale, {hour: '2-digit', minute: '2-digit'})}`
   };
   
    /*
    let myDate = new Date(); 
    let day = String(myDate.getDay()).padStart(2, '0');
    let month = String(myDate.getMonth()).padStart(2, '0');
    let year = String(myDate.getFullYear()).padStart(2, '0');
    let hour = String(myDate.getHours()).padStart(2, '0'); 
    let minute = String(myDate.getMinutes()).padStart(2, '0'); 
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
    */

    const oldListHtml = listElement.innerHTML;
    listElement.innerHTML = oldListHtml + 
    `<li class="comment">
    <div class="comment-header">
      <div>${nameInputElement.value}</div>
      <div> ${formatDate(new Date())} </div>
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