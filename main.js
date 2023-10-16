import { getComments, postComment, deleteComments } from "./api.js";
import { sanitazeHtml } from "./sanitazeHtml.js";
import { renderListOfComments } from "./renderElements.js";

export let token = "";

export const container = document.querySelector(".container");

let isLoader = true; // влияет на отрисовку лоадера или списка комментариев //
export let loadingText = true;
export let user;

try {
  user =  JSON.parse(localStorage.getItem("user"));
} catch  {
   user =  undefined;
}

// Создание масиива с обьектами пользователей который будет рендерится через функцию renderElements() //

 let listOfObject = [];

export function setAuth() {
  
  
}
setAuth();
//Сама функция renderElements которая отрисовывет массив обьетов listOfObject  в разметку HTML //

function renderElements() {
  if (!listOfObject) {
    return;
  }
  renderListOfComments(listOfObject);

  likeButtons();
  changeComments();
  answerOnCommnets()
  deleteComments();
}
renderElements();

function showLoader() {
  if (isLoader) {
    container.innerHTML = `<p>Список комментариев загружается</p>`;
  }
}

showLoader();

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

// Добавляем новый комментарий используя метод POST //

export function addComment(button, addName, addText) {
  button.addEventListener("click", () => {
    button.disabled = true;
    button.textContent = "Добавляю"
    addText.classList.remove("error");
    addName.classList.remove("error");
    postComment(addText, addName, button);
  });
}

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
 export function answerOnCommnets(addText) {
  let commentElements = document.querySelectorAll(".comment-text");
  for (let commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      let index = commentElement.closest(".comment").dataset.index;
      let comment = listOfObject[index];
      addText.value = `${comment.comment} ${comment.name}`;
    });
  }
}

 
