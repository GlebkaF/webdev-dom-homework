import {initApp} from "./main.js";

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;
const getListCommentsEdit = (comment, index) => {
  let likeClass = comment.active ? "-active-like" : "";
     return `<li class="comment">
           <div class="comment-header">
             <div id ="name">${comment.name}</div>
             <div>${comment.date} </div>
           </div>
           <div class="comment-body">
             <div id = "text" data-index="${index}" class="comment-text" style={{ whiteSpace: 'pre-line' }}>
               ${comment.text}
             </div>
           </div>
           <div class="comment-footer">
             <button data-index="${index}" class="edited-button">Редактировать</button>
             <div class="likes">
               <span class="likes-counter">${comment.like}</span> ${comment.like === 1 ? 'лайк' : 'лайков'}
               <button data-index="${index}" class="like-button ${likeClass}"></button> 
             </div>
           </div>
         </li>`
}

export const renderComments = ({comments, handleCommentEditClick, handleCommentFeedbackClick, handleCommentLikeClick}) => {
  const appEl = document.getElementById("app");
  if (!token) {
    const appHtml = `<div class="container-registr" id="container-registr">
    <div>
      <div class="add-form">Форма регистрации
        <input 
          type="text"
          class="add-form-namelogin"
          placeholder="Введите имя"
        />
        <input
          type="text"
          class="add-form-login"
          placeholder="Введите логин"
        />
        <input
          type="password"
          class="add-form-password"
          placeholder="Введите пароль"
        />
        <div class="add-form-registration">
          <button class="add-form-button-registration-activ-registr" id="activ-registr">Зарегистрироваться</button>
        </div>
        <div class="add-form-enter">Войти</div>
      </div>`;
    appEl.innerHTML = appHtml;
    document.getElementById("activ-registr").addEventListener("click", () => {
        token =
          "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
          initApp();
      });

    return;
  }
  const commentsHtml = comments.map((comment, index) => getListCommentsEdit(comment, index))
  .join('');
  const appHtml = `
  <div class="container" id="container" >
  <div id="commentsContainer">
    <ul id="list" class="comments">
    ${commentsHtml}
    </ul>
    <div class="add-form" id="form-comment">
      <input id="name-input"
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
      />
      <textarea id="comment-input"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id="button" class="add-form-button">Написать</button>
      </div>
    </div>
  </div>
  </div>`
     appEl.innerHTML = appHtml;
  //    const buttonElement = document.getElementById("button")
  // const listElement = document.getElementById("list");
  // const nameInputElement = document.getElementById("name-input");
  // const commentInputElement = document.getElementById("comment-input");
  // const commentForm = document.getElementById("form-comment");
  // const commentsContainer = document.getElementById("commentsContainer");
  // const newContainerComments = document.getElementById("container")
      onCommentLikeClick(handleCommentLikeClick);
      onCommentEditClick(handleCommentEditClick);
      onCommentFeedbackClick(handleCommentFeedbackClick);
   }
export const onCommentLikeClick = (handleCommentLikeClick) => {
    const likeButtonsElements = document.querySelectorAll(".like-button");
    for (const likeButtonsElement of likeButtonsElements) {
      likeButtonsElement.addEventListener("click", handleCommentLikeClick);
    }
  };
export const onCommentEditClick = (handleCommentEditClick) => { 
    const editButtonsElements = document.querySelectorAll(".edited-button"); 
    for (const editButtonElement of editButtonsElements) { 
      editButtonElement.addEventListener("click", handleCommentEditClick);
    } 
  };
export const onCommentFeedbackClick = (handleCommentFeedbackClick) => {  
    const feedbackButtonsElements = document.querySelectorAll(".comment-text");   
    for (const feedbackButtonsElement of feedbackButtonsElements) {   
      feedbackButtonsElement.addEventListener("click", handleCommentFeedbackClick);  
    }  
  };
