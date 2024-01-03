import { sanitizeHtml } from './sanitizeHtml.js';
import { formatDate } from './formatDate.js';
import { getCommentsAPI, postCommentAPI } from './api.js';
import { renderComments } from './renderComments.js';
import { checkInputs } from './checkInputs.js';


const buttonElement = document.getElementById('add-form-button');
const listElement = document.getElementById('list');
const addForm = document.querySelector('.add-form');
const addFormName = document.getElementById('add-form-name');
const addFormText = document.getElementById('add-form-text');
const loaderText = document.querySelector('.loader-text');

let comments = [];
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
  .then(() => {
  return getComments();
  })
  .then(() => {
  buttonElement.disabled = false;
  addForm.classList.remove("hidden");
  loaderText.classList.add("hidden");
  });
  addFormName.value = '';
  addFormText.value = '';
});
    