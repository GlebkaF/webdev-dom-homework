"use strict";
import { fetchComments, createComment } from "./api.js";
import { renderComments } from "./renderComments.js"

const renderApp = () => {
renderComments({comments, handleCommentEditClick, handleCommentFeedbackClick, handleCommentLikeClick});
}

  // const buttonElement = document.getElementById("button")
  // const listElement = document.getElementById("list");
  // const nameInputElement = document.getElementById("name-input");
  // const commentInputElement = document.getElementById("comment-input");
  // const commentForm = document.getElementById("form-comment");
  // const commentsContainer = document.getElementById("commentsContainer");
  // const newContainerComments = document.getElementById("container")
  
  const commentAdding = document.createElement('div'); 
  const appEl = document.getElementById("app");
  commentAdding.innerText = 'Пожалуйста подождите, загружаю комментарии...';
  appEl.appendChild(commentAdding);
 
  export const initApp = () => { fetchComments()
  .then((appComments) => {
    comments = appComments;
    renderApp();
    addComment();
  })
  .then((data) => {
    commentAdding.style.display = 'none';
  });
}

  let comments = [
];

const handleCommentLikeClick = (event) => {
  event.stopPropagation();
  const index = event.target.dataset.index;
  const likesContainer = event.target.closest('.comment-footer');
  const likesCounter = likesContainer.querySelector('.likes-counter');
  let likesCount = likesCounter.textContent;
  if (comments[index].active === true) {
    likesCount = (+likesCount) - 1;
    comments[index].active = false;
  } else {
    likesCount = (+likesCount) + 1;
    comments[index].active = true;
  }
  comments[index].like = likesCount;
  renderApp();
};

const handleCommentEditClick = (event) => { 
  event.stopPropagation();
  const button = event.target; 
  const index = button.dataset.index; 
  const buttonTitle = button.innerText; 
  const commentElement = button.parentNode.parentNode; 
  const text = commentElement.getElementsByClassName('comment-text')[0]; 
  const isEdit = comments[index].isEdit; 
  if (buttonTitle === 'Редактировать') { 
    button.innerText = 'Сохранить'; 
    if (!isEdit) { 
      comments[index].isEdit = true; 
      text.innerHTML = `<textarea>${text.innerText}</textarea>`; 
    } 
  } 
  else { 
    button.innerText = 'Редактировать'; 
    if (isEdit) { 
      comments[index].isEdit = false; 
      const textArea = text.getElementsByTagName('textarea')[0]; 
      comments[index].text = textArea.value; 
      text.innerHTML = comments[index].text; 
    } 
  } 
};

let currentCommentFeedback = null;
const handleCommentFeedbackClick = (event) => { 
  const commentInputElement = document.getElementById("comment-input");
  currentCommentFeedback = event.target.dataset.index;
  commentInputElement.value = `>${comments[currentCommentFeedback].text} ${comments[currentCommentFeedback].name}`;
};

initApp();

const addComment = () => { 
  const buttonElement = document.getElementById("button")
  buttonElement.addEventListener("click", () => {
  const commentForm = document.getElementById("form-comment");
  // const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  commentForm.style.display = 'none';
  const commentAddingMessage = document.createElement('div'); 
  commentAddingMessage.innerText = 'Комментарий добавляется...';
  commentForm.parentNode.insertBefore(commentAddingMessage, commentForm); 
      
  // nameInputElement.classList.remove("error");
  // if (nameInputElement.value === "" && nameInputElement.value.length < 3) {
  //     nameInputElement.classList.add("error");
  //     return;
  //     }
  commentInputElement.classList.remove("error");
  if (commentInputElement.value === "" && commentInputElement.value.length < 3) {
      commentInputElement.classList.add("error");
      return;
      }
  renderApp();
  createComment(commentInputElement.value)      
  .then(() => {
    initApp();
  })
  .then((data) => {
    commentAddingMessage.style.display = 'none';
    commentForm.style.display = 'block';
    // nameInputElement.value = "";
    commentInputElement.value = "";
    renderApp();
  })
  .catch((error) => {
    commentAddingMessage.style.display = "none";
    commentForm.style.display = "block";
    if (error.message === "Неверный запрос") {
      alert("Имя и комментарий должны быть не короче 3-х символов");
    } 
    if (error.message === "Сервер упал") {
      alert("Извините сервер сломался, попробуйте позже");
    }
    else {
      alert("Отсутствует подключение к сети, попробуйте позже!");
    }
    console.warn(error);
  });
});
}


