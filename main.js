import { getComments, postComment } from "./api.js";
import { sanitazeHtml } from "./sanitazeHtml.js";
import { renderListOfComments } from "./renderElements.js";

const list = document.querySelector(".comments");
const button = document.querySelector(".add-form-button");
const addName = document.querySelector(".add-form-name");
const addText = document.querySelector(".add-form-text");
const textForLoading = document.getElementById("text-for-loader");
const addForm = document.querySelector(".add-form");
let isLoader = true; // влияет на отрисовку лоадера или списка комментариев //

// Создание масиива с обьектами пользователей который будет рендерится через функцию renderElements() //

let listOfObject = [];

//Сама функция renderElements которая отрисовывет массив обьетов listOfObject  в разметку HTML //

function renderElements() {
  if (!listOfObject) {
    return;
  }
  renderListOfComments(listOfObject, list);

  likeButtons();
  changeComments();
  answerOnCommnets();
}
renderElements();

// Создание fetch запроса к API //

if (isLoader) {
  list.innerHTML = `<p>Список комментариев загружается</p>`;
}

export function getFetchPromise() {
  getComments()
    .then((dataResponse) => {
      console.log(dataResponse);
      const newList = dataResponse.comments.map((element) => {
        return {
          name: sanitazeHtml(element.author.name),
          data: new Date(element.date).toLocaleString().replace(",", ""),
          comment: sanitazeHtml(element.text),
          like: element.likes,
          isLiked: false,
          id: element.id,
        };
      });
      listOfObject = newList;
      renderElements();
      isLoader = false;
    })
    .catch((error) => {
      if (error.message === "Что то с сервером") {
        alert("Сервер сломался попробуй позже");
      }
      console.log(error);
    });
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

// Добавляем новый комментарий используя метод POST //
function addComment() {
  button.addEventListener("click", () => {
    addText.classList.remove("error");
    addName.classList.remove("error");

    textForLoading.classList.remove("hidden");
    addForm.classList.add("hidden");
    postComment(addText, addName, addForm, textForLoading);
  });
}
addComment();

//Функция для проставки лайка //

function likeButtons() {
  let likeButtons = document.querySelectorAll(".like-button");
  for (let likeButton of likeButtons) {
    let index = likeButton.closest(".comment").dataset.index;
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
  }
}

//Функция редактирования комментария

function changeComments() {
  let changeButtons = document.querySelectorAll(".change-comment-button");
  const addText = document.querySelector(".add-form-text");
  for (let changeButton of changeButtons) {
    changeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      let index = changeButton.closest(".comment").dataset.index;
      let comment = listOfObject[index];
      if (comment.isEdit) {
        comment.isEdit = false;
        comment.comment = addText.value;
        comment.data = new Date().toLocaleString().replace(",", "");
      } else {
        comment.isEdit = true;
      }
      renderElements();
    });
  }
}

// Функция ответа на комментарий //

function answerOnCommnets() {
  let commentElements = document.querySelectorAll(".comment-text");
  for (let commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      let index = commentElement.closest(".comment").dataset.index;
      let comment = listOfObject[index];
      addText.value = `${comment.comment} ${comment.name}`;
      renderElements();
    });
  }
}
