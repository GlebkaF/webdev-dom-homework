// "use strict";

import { getComments, postComment} from "./api.js";

const list = document.querySelector(".comments");
const button = document.querySelector(".add-form-button");
const addName = document.querySelector(".add-form-name");
const addText = document.querySelector(".add-form-text");
const addForm = document.querySelector(".add-form");
let isLoader = true; // влияет на отрисовку лоадера или списка комментариев (формы заполнения данных) //
// Работает isLoader только при первичной загрузке приложения что бы показать что список загружается  //
const textForLoading = document.getElementById("text-for-loader"); // Данный элемент будет отображаться при загрузке комментария //




// Создание масиива с обьектами пользователей который будет рендерится через функцию renderElements() //

let listOfObject = [];

//Сама функция renderElements которая массив обьетов listOfObject рендерит в разметку HTML //

function renderElements() {

  if (!listOfObject) {
    return;
  }

  let listOfElements = listOfObject.map((element, index) => {
    return `<li data-index="${index}" class="comment">
      <div class="comment-header">
        <div>${element.name}</div>
        <div>${element.data}</div>
      </div>
      <div class="comment-body">
        ${element.isEdit ? ` <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4">${element.comment}</textarea>` : `<div class="comment-text">${element.comment}</div>`}
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${element.like}</span>
          <button data-index="${index}" class="like-button ${element.isLiked ? "-active-like" : ""}"></button> 
        </div>
      </div>
      <div class="block-btn">
        <button data-index="${index}"class="change-comment-button">${element.isEdit ? "Сохранить" : "Редактировать"}</button>
      <button data-index="${index}" class="add-form-button add-form-button_reset">Удалить</button>
        </div>
    </li>`;
  })
    .join("");
  list.innerHTML = listOfElements;
  likeButtons();
  changeComments();
  answerOnCommnets();
  removeComments();
}
renderElements();


// Создание fetch запроса к API + перед выполнением запроса  мы выводим сообщение пользователю о загрузке списка комментариев //


if (isLoader) {
  list.innerHTML = `<p>Список комментариев загружается</p>`
}

function getFetchPromise() {
    getComments()
    .then((dataResponse) => {
      console.log(dataResponse);
      const newList = dataResponse.comments.map((element) => {
        return {
          name: element.author.name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
          data: new Date(element.date).toLocaleString().replace(",", ""),
          comment: element.text.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
          like: element.likes,
          isLiked: false,
          id: element.id
        }
      })
      listOfObject = newList;
      renderElements();
      isLoader = false;
    })
    .catch((error) => {
      if (error.message === "Что то с сервером") {
        alert("Сервер сломался попробуй позже");
      }
      console.log(error);
    })
}
getFetchPromise();

// Валидация формы на предмет пустых значений в полях имени и текста //

function validation() {
  if (!addName.value || !addText.value) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}
addName.addEventListener("input", validation);
addText.addEventListener("input", validation);

validation();


// Обработчик событий на кнопку Отправить + мы обращаемся к нашему API что бы отправить в API  новый комметарий используя метод POST

function addComment() {

    button.addEventListener("click", () => {
      addText.classList.remove("error");
      addName.classList.remove("error");

      textForLoading.classList.remove("hidden");
      addForm.classList.add("hidden");

      postComment(addText, addName)
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            } else if (response.status === 400) {
              addText.classList.add("error");
              addName.classList.add("error");
              throw new Error("Короткое имя");
            } else if (response.status === 500) {
              throw new Error("Что то с сервером")
            } else if (response.status === "Ошибка сервера") {
              throw new Error("Failed to fetch")
            }
          })
          .then((dataResponse) => {
            console.log(dataResponse);
            getFetchPromise();
            addName.value = "";
            addText.value = "";
            textForLoading.classList.add("hidden");
            addForm.classList.remove("hidden");
          })
          .catch((error) => {
            if (error.message === "Короткое имя") {
              alert("Имя и комментарий должны быть не короче 3 символов");
            }
            if (error.message === "Что то с сервером") {
              alert("Сервер сломался попробуй позже");
              postComment(addText, addName);
            }
            if (error.message === "Failed to fetch") {
              alert("Кажется, у вас сломался интернет, попробуйте позже")
            }
            textForLoading.classList.add("hidden");
            addForm.classList.remove("hidden");
            console.log(error);
          })
    })
  }
  addComment()


// Функция для удаления комментария//

function removeComments() {
  const buttonResets = document.querySelectorAll(".add-form-button_reset");
  for (let buttonReset of buttonResets) {
    buttonReset.addEventListener("click", () => {
      let index = buttonReset.dataset.index;

      listOfObject.splice(index, 1)
      renderElements()
    })
  }
}



//Функция для проставки лайка

function likeButtons() {
  let likeButtons = document.querySelectorAll(".like-button");
  for (let likeButton of likeButtons) {
    let index = likeButton.dataset.index;
    let comment = listOfObject[index];
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (comment.isLiked) {
        comment.isLiked = false;
        comment.like--;
      } else {
        comment.isLiked = true;
        comment.like++;
      }
      renderElements();
    });
  };
}


//Функция редактирования комментария


function changeComments() {
  let changeButtons = document.querySelectorAll(".change-comment-button");
  const addText = document.querySelector(".add-form-text");
  for (let changeButton of changeButtons) {
    changeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      let index = changeButton.dataset.index;
      let comment = listOfObject[index]
      if (comment.isEdit) {
        comment.isEdit = false;
        comment.comment = addText.value;
        comment.data = new Date().toLocaleString().replace(",", "");
      } else {
        comment.isEdit = true;
      }
      renderElements();
    })
  }
}


// Функция ответа на комментарий //

function answerOnCommnets() {
  let commentElements = document.querySelectorAll(".comment-text")
  for (let commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      let index = commentElement.closest('.comment').dataset.index;
      let comment = listOfObject[index];
      addText.value = `${comment.comment} ${comment.name}`;
      renderElements();
    })
  }
}
