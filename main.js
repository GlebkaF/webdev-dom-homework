"use strict";
import { fetchComments, apiLike, apiDeleteComment } from "./api.js";
import { renderComments } from "./renderComments.js"
import { format } from "date-fns"
export const now = (comment) => {
    let date = format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss");
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear().toString().substr(-2);
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    const resultDate = `${year}.${month}.${day} ${hours}:${minutes}`;
    return resultDate;
};

const renderApp = () => {
renderComments({comments, handleCommentDeleteClick, handleCommentEditClick, handleCommentFeedbackClick, handleCommentLikeClick});
}

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
  apiLike(comments[index].id);
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

const handleCommentDeleteClick = (event, comment) => {
  const commentElement = event.target.closest(".comment");
  if (commentElement) {
    commentElement.remove();
    apiDeleteComment(comment.id);
  }
}

initApp();



