// 2.9 DOM 1. Управление шаблоном из JS, события
"use strict";
const name_Input_Element = document.querySelector(".add-form-name");
const comment_Input_Element = document.querySelector(".add-form-text");
const button_Element = document.querySelector(".add-form-button");
const comments_Element = document.querySelector(".comments");
let currentDate = new Date();
let year = currentDate.getFullYear().toString().slice(2);
let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
let day = ('0' + currentDate.getDate()).slice(-2);
let hours = ('0' + currentDate.getHours()).slice(-2);
let minutes = ('0' + currentDate.getMinutes()).slice(-2);
let formattedDateTime = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;

// Установка формата даты ДД.ММ.ГГГГ ЧЧ:ММ
const date = function () {
  const months = ["01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12"];
  let commentDate = new Date();
    let currentDate = commentDate.getDate() + "." + months[commentDate.getMonth()] + "." + commentDate.getFullYear();
    let hour = commentDate.getHours();
    let minute = commentDate.getMinutes();
    let second = commentDate.getSeconds();
      if (minute < 10) {
        minute = "0" + minute;
      }
      let currentTime = hour + ":" + minute;
      let fullDate = `${currentDate} ${currentTime}`;
      return fullDate
}


// Функция клика, валидация
button_Element.addEventListener("click", () => {
  name_Input_Element.classList.remove("error");
  comment_Input_Element.classList.remove("error");
  button_Element.classList.remove("disabled-button");

  // Удаление пробелов спереди и сзади в полях ввода
  name_Input_Element.value = name_Input_Element.value.trim();
  comment_Input_Element.value = comment_Input_Element.value.trim();

  // Проверка на пустые поля
  if (name_Input_Element.value === "" || comment_Input_Element.value === "" ){
    name_Input_Element.classList.add("error");
    comment_Input_Element.classList.add("error");
    button_Element.classList.add("disabled-button");
    return;
  };

// Добавляем новый комментарий
  const oldListElement = comments_Element.innerHTML;
  comments_Element.innerHTML = oldListElement + `<li class="comment">
    <div class="comment-header">
      <div>${name_Input_Element.value}</div>
      <div>${formattedDateTime}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">${comment_Input_Element.value}</div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`;

name_Input_Element.value = "";
comment_Input_Element.value = "";
});

// Добавление комментрия клавишей Enter
document.addEventListener("keyup", (event) => {
  if (event.code === 'Enter') {
    document.querySelector(".add-form-button").click();
    return;
  }
});
