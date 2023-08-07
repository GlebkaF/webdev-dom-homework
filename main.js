import { getComments, postComment } from "./api.js";
import { renderUsers } from "./render.js";

const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const buttonLike = document.getElementById("like");
const formElement = document.querySelector(".add-form");
const addFormHtml = `<input
          id="name-input"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea
          id="comment-input"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button">Написать</button>
        </div>`;

let users = [];

// Загрузка
formElement.innerHTML = 'Комметарии загружаются...';

// Получение данных из API
const getApi = () => {
  const formElement = document.querySelector(".add-form");
  const commentsElement = document.querySelector(".comments");

  getComments().then((responseData) => {
    users = responseData.comments;
    formElement.innerHTML = addFormHtml;
    renderUsers({ addLike, answer, commentsElement });
    addEventButton();
  })
}

const postApi = () => {

  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");


  postComment({
    text: commentInputElement.value,
    name: nameInputElement.value,
    getApi,
    addEventButton

  }).catch((error) => {

    alert(error);

  })
}

// Установка формата даты ДД.ММ.ГГГГ ЧЧ:ММ
const date = function (date) {
  const months = ["01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"];
  let commentDate = new Date(date);
  let currentDate = commentDate.getDate() + "." + months[commentDate.getMonth()] + "." + commentDate.getFullYear();
  let hour = commentDate.getHours();
  let minute = commentDate.getMinutes();

  if (minute < 10) {
    minute = "0" + minute;
  }
  let currentTime = hour + ":" + minute;

  let fullDate = `${currentDate} ${currentTime}`;
  return fullDate
}

// Добавление комментрия клавишей Enter
document.addEventListener("keyup", (event) => {
  if (event.code === 'Enter') {
    document.getElementById("add-button").click();
    return;
  }
});

// Кнопка лайка
const getLikeClass = (element) => {
  return element ? "like-button -active-like" : "like-button"
}

// Добавить лайк
function addLike() {
  const likeElements = document.querySelectorAll('.like-button')

  likeElements.forEach((element, index) => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
      const user = users[index];
      if (user.isLiked === true) {
        user.isLiked = false;
        user.likes -= 1;
        renderUsers({ addLike, answer });
      } else {
        user.isLiked = true;
        user.likes += 1;
        renderUsers({ addLike, answer });
      }
    })
  })
}

// Ответ на комментарий
const answer = () => {
  const commentAnswers = document.querySelectorAll('.comment');
  commentAnswers.forEach((textElement, index) => {
    textElement.addEventListener('click', (event) => {
      let textValue = textElement.textContent;
      const commentInputElement = document.getElementById("comment-input");
      return commentInputElement.value = `${users[index].text} ${users[index].author.name}, `;
    });
  });
};



// Функция клика, валидация
function addEventButton() {
  const buttonElement = document.getElementById("add-button");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");

  buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElement.value === "" || commentInputElement.value === "") {
      nameInputElement.classList.add("error");
      commentInputElement.classList.add("error");
      buttonElement.classList.add("disabled-button");
      return;
    } else {
      buttonElement.classList.remove("disabled-button");
    }

    postApi();
  });
}
getApi();
console.log("It works!");