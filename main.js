import { getComments, postComment, deleteComments, toggleLike } from "./api.js";
import { sanitazeHtml } from "./sanitazeHtml.js";
import { renderListOfComments } from "./renderElements.js";



export const container = document.querySelector(".container");

let isLoader = true; // влияет на отрисовку лоадера или списка комментариев //
export let loadingText = true;
export let user;



// Создание масиива с обьектами пользователей который будет рендерится через функцию renderElements() //

 let listOfObject = [];




export function setAuth() {
  
  try {
    user =  JSON.parse(localStorage.getItem("user"));
  } catch  {
     user =  undefined;
  }
}
setAuth()



export function logOut() {
  localStorage.removeItem("user");
  user = null;
}


//Сама функция renderElements которая отрисовывет массив обьетов listOfObject  в разметку HTML //

  export function renderElements() {
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
          isLiked: element.isLiked,
          id: element.id,
        };
      });
      listOfObject = newList;
      console.log(listOfObject);
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
    likeButton.addEventListener("click", (event) => {
      if(!user){
        alert("Нужно зарегистрироваться");
       return;
      }
      let id = likeButton.dataset.id;
      event.stopPropagation();
      toggleLike(id)
    });
  }
}

//Функция редактирования комментария

function changeComments() {
  let changeButtons = document.querySelectorAll(".change-comment-button");
  const addText = document.querySelector(".add-form-text");
  for (let changeButton of changeButtons) {
    changeButton.addEventListener("click", (event) => {
      if(!user){
        alert("Нужно зарегистрироваться");
       return;
      }
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
      if(!user){
        alert("Нужно зарегистрироваться");
       return;
      }
      let index = commentElement.closest(".comment").dataset.index;
      let comment = listOfObject[index];
      addText.value = `${comment.comment} ${comment.name}`;
    });
  }
}

 
