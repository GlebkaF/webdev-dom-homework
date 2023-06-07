"use strict";
import { fetchComments, createComment } from "./api.js";
import { renderComments } from "./renderComments.js"

const renderApp = () => {
renderComments({comments, handleCommentEditClick, handleCommentFeedbackClick, handleCommentLikeClick});
}

  const buttonElement = document.getElementById("button")
  const commentAdding = document.createElement('div'); 
  const appEl = document.getElementById("app");
  commentAdding.innerText = 'Пожалуйста подождите, загружаю комментарии...';
  appEl.appendChild(commentAdding);
 
  export const initApp = () => { fetchComments()
  .then((appComments) => {
    comments = appComments;
    renderApp();
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



