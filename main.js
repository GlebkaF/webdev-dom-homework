"use strict";
import { fetchComments, createComment } from "./api.js";
import { formatDate } from "./utils.js";
import {
  renderComments,
  // onCommentLikeClick,
  // onCommentEditClick,
  // onCommentFeedbackClick
} from "./renderComments.js"

const render = () => {
  renderComments(comments, handleCommentEditClick, handleCommentFeedbackClick, handleCommentLikeClick);
}
  const buttonElement = document.getElementById("button")
  const listElement = document.getElementById("list");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  const commentForm = document.getElementById("form-comment");
  const commentsContainer = document.getElementById("commentsContainer");
  const newContainerComments = document.getElementById("container")

  commentsContainer.style.display = 'none';
  const commentAdding = document.createElement('div'); 
  commentAdding.innerText = 'Пожалуйста подождите, загружаю комментарии...';
  commentsContainer.parentNode.insertBefore(commentAdding, commentsContainer);
  const fetchPromise = () => { fetchComments()
  .then((appComments) => {
    comments = appComments;
    render();
  })
  .then((data) => {
    commentAdding.style.display = 'none';
    commentsContainer.style.display = 'block';
  });
}

  let comments = [
];

const handleCommentLikeClick = () => {
  event.stopPropagation();
  const index = likeButtonsElement.dataset.index;
  const likesContainer = likeButtonsElement.closest('.comment-footer');
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
  render();
};

const handleCommentEditClick = () => { 
  event.stopPropagation();
  const index = editButtonElement.dataset.index; 
  const button = event.target; 
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
const handleCommentFeedbackClick = () => {  
  currentCommentFeedback = feedbackButtonsElement.dataset.index;
  commentInputElement.value = `>${comments[currentCommentFeedback].text} ${comments[currentCommentFeedback].name}`;
};

fetchPromise();
render();

buttonElement.addEventListener("click", () => {
  commentForm.style.display = 'none';
  const commentAddingMessage = document.createElement('div'); 
  commentAddingMessage.innerText = 'Комментарий добавляется...';
  commentForm.parentNode.insertBefore(commentAddingMessage, commentForm); 
      
  nameInputElement.classList.remove("error");
  if (nameInputElement.value === "" && nameInputElement.value.length < 3) {
      nameInputElement.classList.add("error");
      return;
      }
  commentInputElement.classList.remove("error");
  if (commentInputElement.value === "" && commentInputElement.value.length < 3) {
      commentInputElement.classList.add("error");
      return;
      }
  let date = new Date();
  let likes = 0;
  comments.push({ 
    name: nameInputElement.value
    .replaceAll("<", "&lt;")
    .replaceAll(">","&gt;"), 
    date: formatDate(date), 
    text: commentInputElement.value
    .replaceAll("<", "&lt;")
    .replaceAll(">","&gt;"), 
    active: false,
    like: likes, 
  });
createComment(nameInputElement.value, commentInputElement.value)      
  .then(() => {
    fetchPromise();
  })
  .then((data) => {
    commentAddingMessage.style.display = 'none';
    commentForm.style.display = 'block';
    nameInputElement.value = "";
    commentInputElement.value = "";
    render();
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

