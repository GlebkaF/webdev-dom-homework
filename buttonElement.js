import { postComment } from "./api.js";
import { fetchComments } from "./fetchComments.js";

const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

export function clickButton() {
  buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    if(nameInputElement.value === '') {
      nameInputElement.classList.add("error");
      return;
    }
  
    commentInputElement.classList.remove("error");
    if(commentInputElement.value === '') {
      commentInputElement.classList.add("error");
      return;
    }
  
    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий отправляется...";
    
  const postPromise = () => {
  
  postComment()
  .then(() => {
    return fetchComments();
  })
  .then(() => {
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
    nameInputElement.value = "";
    commentInputElement.value = "";
  })
  .catch((error) => {
    if (error.message === 'Сервер сломался, попробуй позже') {
      alert('Сервер сломался, попробуй позже');
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      return;
    }
    if (error.message === 'Имя и комментарий должны быть не короче 3 символов') {
      alert('Имя и комментарий должны быть не короче 3 символов');
      buttonElement.disabled = true;
      buttonElement.textContent = "Написать";
      return;
    }
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
    alert('Кажется, у вас сломался интернет, попробуйте позже');
    console.warn(error);
  })
  };
  postPromise();
  });
}