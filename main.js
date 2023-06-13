const btn = document.querySelector(".add-form-button");
const ul = document.querySelector(".comments");
const nameUser = document.querySelector(".add-form-name");
const commentUser = document.querySelector(".add-form-text");
const form = document.querySelector(".add-form");
const del = document.querySelector(".remove-form-button");

//! Работа с временем
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear() - 2000;
let hour = date.getHours();
let minute = date.getMinutes();
if (month < 10) {
  month = "0" + month;
}
if (hour < 10) {
  hour = "0" + hour;
}
if (minute < 10) {
  minute = "0" + minute;
}
date = day + "." + month + "." + year + "  " + hour + ":" + minute;

btn.addEventListener("click", (e) => {
    //! Проверка на ввод имени/комментария
    if (nameUser.value === "" || commentUser.value === "") {
        alert("Вы не ввели имя или комментарий");
        return;
    }
    //! создание нового элемента li
  const oldUl = ul.innerHTML;
  ul.innerHTML =
    oldUl +
    `<li class="comment">
    <div class="comment-header">
      <div>${nameUser.value}</div>
      <div>${date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${commentUser.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`;
//! Чистка инпута после отправки
  nameUser.value = "";
  commentUser.value = "";
});

//! Срабатывание добавления комментария на кнопку Enter
form.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
    if (nameUser.value === "" || commentUser.value === "") {
        alert("Вы не ввели имя или комментарий");
        return;
    }
  const oldUl = ul.innerHTML;
  ul.innerHTML =
    oldUl +
    `<li class="comment">
    <div class="comment-header">
      <div>${nameUser.value}</div>
      <div>${date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${commentUser.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`;
  nameUser.value = "";
  commentUser.value = "";
    }
})

//! Удаление последнего коммента
del.addEventListener('click', (e) => {
    let newLi = ul.lastElementChild.remove();
})






//! Делаем отправку некликабельной, если у нас не заполнены поля

// btn.addEventListener('click', () => {
//     console.log(12);
// })

// commentUser.addEventListener("input", commentUnlock);
// function commentUnlock(e) {
//     if (commentUser.textContent == "") {
//         btn.classList.remove("btn-gray");
//     }
//     if (e.target.value == "") {
//         btn.classList.add("btn-gray");
//     }
// }

// nameUser.addEventListener("input", nameUnlock);
// function nameUnlock(e) {
//     if (nameUser.textContent == "") {
//         btn.classList.remove("btn-gray");
//     }
//     if (e.target.value == "") {
//         btn.classList.add("btn-gray");
//     }
// }

