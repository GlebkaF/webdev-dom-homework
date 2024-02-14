
import { postComments } from './api.js';
import { fetchPromise} from './main.js';
import { Render } from './render.js';

//переменные для работы
const waitElement = document.getElementById("form-wait");
const waitFormElement = document.getElementById("add-form-wait");
const buttonElement = document.getElementById("add-form-button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const DeleteButtonElement = document.getElementById("delete-button");
let originalComment = document.getElementById("comment-original");




//функция добавления комментария (по клику)
export function buttonClick() {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    buttonElement.classList.remove("click-none");
    if (nameInputElement.value === '') {
      nameInputElement.classList.add("error");
      buttonElement.classList.add("click-none");
      return;
    } else if (commentInputElement.value === '') {
      commentInputElement.classList.add("error");
      buttonElement.classList.add("click-none");
      return;
    };
    let myDate = new Date();
    DeleteButtonElement.disabled = true;
    DeleteButtonElement.classList.add("click-none");
    waitFormElement.classList.add("edit-none");
    waitElement.classList.remove("edit-none");
    postComments({
      name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: myDate.getDate() + ":" + (myDate.getMonth() + 1) +
        ":" + myDate.getFullYear() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(),
      text: commentInputElement.value.replace(originalComment, '').replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      likesCounter: 0,
      itLikes: false,
      original: `${commentInputElement.value.includes(originalComment) ? originalComment : ''}`,
      answer: '',
      isLikeLoading: false,
  
    }).then(() => {
      return fetchPromise();
    }).then((data) => {
      DeleteButtonElement.disabled = false;
      DeleteButtonElement.classList.remove("click-none");
      waitFormElement.classList.remove("edit-none");
      waitElement.classList.add("edit-none");
      nameInputElement.value = '';
      commentInputElement.value = '';
    }).catch((error) => {
      if (error.message === "Введенные имя или комментарий короче 3-х знаков") {
        alert("Ваше имя или Ваш комментарий короче 3-х знаков. Попробуйте еще раз!");
      } else if (error.message === "Сервер упал.") {
        buttonClick();
        //alert("Сервер упал. Попробуйте позже...");
      } else {
        alert("Что-то пошло не так, попробуйте позже...");
      };
      console.warn(error)
      DeleteButtonElement.disabled = false;
      DeleteButtonElement.classList.remove("click-none");
      waitFormElement.classList.remove("edit-none");
      waitElement.classList.add("edit-none");
    });
    Render();
  }
  

  //добавлениe комментария по клику на кнопку "написать"
buttonElement.addEventListener('click', buttonClick);




//добавление комментария по клику на кнопку "Enter"
document.body.addEventListener('keyup', (e) => {
  if (e.key == 'Enter') {
    buttonClick();
  }
});