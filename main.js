import { sanitizeHtml } from './sanitizeHtml.js';
import { formatDate } from './formatDate.js';
import { getCommentsAPI, postCommentAPI } from './api.js';
import { renderComments } from './renderComments.js';
import { checkInputs } from './checkInputs.js';


const buttonElement = document.getElementById('add-form-button');

const addForm = document.querySelector('.add-form');
const addFormName = document.getElementById('add-form-name');
export const addFormText = document.getElementById('add-form-text');
const loaderText = document.querySelector('.loader-text');

export let comments = [];
const getComments = () => {
  getCommentsAPI().then((responseData) => {
	  const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        timestamp: formatDate(new Date(comment.date)),
        text: comment.text,
        likesCounter: comment.likes,
        isLiked: comment.isLiked
      }
    });
    comments = appComments;
    renderComments({comments});
  })
  .catch((error) => {
    if (error.status === 500) {
      getComments();
      return;
    } else {
      alert("Похоже, пропал интернет. Попробуй позже");
    }
    console.log(error);
    })
};
getComments();

buttonElement.disabled = true;
  
    
addFormName.addEventListener("input", () => {
      checkInputs([addFormName.value, addFormText.value], buttonElement)
});

addFormText.addEventListener("input", () => {
      checkInputs([addFormName.value, addFormText.value], buttonElement)
});
    
buttonElement.addEventListener("click", () => {
  addFormName.classList.remove("error");
  addFormText.classList.remove("error");
      if(addFormName.value === "") {
        addFormName.classList.add("error");
        buttonElement.setAttribute('disabled', "");
        return;
      }
      if(addFormText.value === "") {
        addFormText.classList.add("error");
        buttonElement.setAttribute('disabled', "");
        return;
      }
  buttonElement.disabled = true;
  addForm.classList.add("hidden");
  loaderText.classList.remove("hidden");
  postCommentAPI({name: sanitizeHtml(addFormName.value), text: sanitizeHtml(addFormText.value)})
  .then((response) => {
      if (response.status === 400) {
      throw new Error("Плохой запрос");
      }
      if (response.status === 500) {
      throw new Error("Сервер сломался");
      }
    })
  .then(() => {
  return getComments();
  })
  .then(() => {
  buttonElement.disabled = false;
  addForm.classList.remove("hidden");
  loaderText.classList.add("hidden");
  addFormName.value = '';
  addFormText.value = '';
  })
  .catch((error) => {
      buttonElement.disabled = false;
      addForm.classList.remove("hidden");
      loaderText.classList.add("hidden");
    if (error.message === "Сервер сломался") {
      postCommentAPI({name: sanitizeHtml(addFormName.value), text: sanitizeHtml(addFormText.value)});
      return;
    } else if (error.message === "Плохой запрос") {
      alert("Имя или текст не должны быть короче 3 символов, попробуй снова");
      return;
    } else {
      alert("Что-то пошло не так, проверьте интернет");
    }
    console.log(error);
  });
});
    