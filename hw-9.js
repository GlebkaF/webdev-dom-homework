"use strict";

const WriteButtonEl = document.getElementById("write-button");
const nameInputEl = document.getElementById("name-input");
const commentTextEl = document.getElementById("comment-text");
const listEl = document.getElementById("comment-list");
let currentDate = new Date();

//date of comment
let day = currentDate.getDay();
let month = currentDate.getMonth() + 1;
let year = String(currentDate.getFullYear()).split('').slice(2).join('');
let hour = currentDate.getHours();
let minute = currentDate.getMinutes()

if (day < 10) { 
	day = "0" + day; 
}
if (month < 10) { 
	month = "0" + month; 
}
if (hour < 10) { 
	hour = "0" + hour;
};
if (minute < 10) { 
	minute = "0" + minute; 
}

let commentDate = day + '.' + month + '.' + year + ' ' + hour + ':' + minute;
//

WriteButtonEl.addEventListener("click", () => {
    nameInputEl.classList.remove("error");
    commentTextEl.classList.remove("error");

    if (nameInputEl.value === "" && commentTextEl.value === "") {
        nameInputEl.classList.add("error");
        commentTextEl.classList.add("error");
        return;
      } else if (nameInputEl.value === "" && commentTextEl.value !== "") {
        nameInputEl.classList.add("error");
        return;
      } else if (nameInputEl.value !== "" && commentTextEl.value === "") {
        commentTextEl.classList.add("error");
        return;
      } else {
        const oldListHtml = listEl.innerHTML;
        listEl.innerHTML =
          oldListHtml +
          `<li class="comment">
          <div class="comment-header">
            <div>${nameInputEl.value}</div>
            <div>${commentDate}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${commentTextEl.value}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>
          </li>`
      }
      nameInputEl.value = "";
      commentTextEl.value = "";

});

console.log("It works!");