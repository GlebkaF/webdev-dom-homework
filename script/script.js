import { getCommentsApi, postCommentsApi } from "./api.js";
import { renderComments } from "./renderComment.js";
import { getEvent } from "./events.js";

const inputName = document.querySelector(".add-form-name");
const inputText = document.querySelector(".add-form-text");
const buttonAdd = document.querySelector(".add-form-button");
const addFormBox = document.querySelector(".add-form");
const preloader = document.querySelector(".preloader");

// масив комментариев, тут хранятся все комментарии
let arrComments = [];


buttonAdd.addEventListener("click", sendComment);
inputName.addEventListener("keyup", (key) => {
  if (key.code === "Enter") {
    key.preventDefault();
    inputText.focus();
  }
});
inputText.addEventListener("keydown", (key) => {
  if (key.code === "Enter") {
    // чтобы не срабатывал enter
    key.preventDefault();
    sendComment();
  }
});
inputText.addEventListener("input", switchButton);
inputName.addEventListener("input", switchButton);

const getComments = () => {
  preloader.classList.add("--ON");
  addFormBox.classList.remove("--ON");
  getCommentsApi()
    .then((data) => {
      arrComments = [...data.comments];
      renderComments();
      getEvent();
      preloader.classList.remove("--ON");
      addFormBox.classList.add("--ON");
    })
    .catch(() => {
      alert("Упс, кажется что-то пошло не так...");
      // тут должен быть код для записи ошибки в логи
    });
};

function sendComment() {
  // проверка на пустые поля
  if (
    inputName.value.trim().length === 0 ||
    inputText.value.trim().length === 0
  ) {
    return;
  }

  preloader.classList.add("--ON");
  addFormBox.classList.remove("--ON");

  postCommentsApi()
    .then((data) => {
      if (data.result === "ok") {
        getComments();
        inputName.value = "";
        inputText.value = "";

        switchButton();
      }
    })
    .catch((error) => {
      if (error.message !== "500") {
        if (error.message !== "400") {
          alert("Упс, кажется что-то пошло не так...");
        }
        // тут должен быть код для записи ошибки в логи
        preloader.classList.remove("--ON");
        addFormBox.classList.add("--ON");
      } else {
        // мне кажется сюда стоит добавить количество попыток, чтобы глубоко не уходить в рекурсию
        sendComment();
      }
    });
}

// форматирование даты
const getDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

function switchButton() {
  // Проверка на > 3 так как в другом случае api даст ошибку
  if (
    inputName.value.trim().length !== 0 &&
    inputText.value.trim().length !== 0
  ) {
    buttonAdd.classList.add("active");
    buttonAdd.classList.remove("inactive");
  } else {
    buttonAdd.classList.add("inactive");
    buttonAdd.classList.remove("active");
  }
}

// Пока у меня нет доступа к изменению или удалению, удаление не работает

// document.querySelector(".del-last-comment").addEventListener("click", () => {
//   const indexLast = comments.innerHTML.lastIndexOf('<li class="comment">');
//   comments.innerHTML = comments.innerHTML.slice(0, indexLast);

//   // так же удаляем из массива, чтобы не было ошибок при рендере
//   arrComments.pop();

//   // Заново накидываем ивенты, они почему-то сбрасываются
//   eventLike();
//   eventEdit();
//   evenEditInput();
// });

// start
getComments();

export { getDate, getEvent, arrComments };
