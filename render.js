import { answer, autoInfo, initDeleteButtonsListeners, initEdit, likes } from "./main.js";
import { renderForm, renderFormButton } from "./renderForm.js";
renderFormButton

export const renderComments = (commentsArray) => {
const app = document.querySelector(".app");






  const commentsHtml = commentsArray?.map((item, index) => {

    return `
          <li class="comment" data-answer="${index}">
                <div class="comment-header">
                  <div>${item.name}</div>
                  <div>${item.date}</div>
                </div>
                <div class="comment-body">
                ${!item.isEdit ? `<div data-comment='${index}' class="comment-text" >
                ${item.comment}
                
                
              </div > ` : `<input value='${item.comment}'>`}

    
                  
                </div >
    <div class="comment-footer">
    <button data-answer="${index}" class="answer-button">Ответить</button>
        <button data-edit="${index}" class="edit-button">${!item.isEdit ? "Редактировать" : "Сохранить"}</button>
        <button data-index='${index}' class="delete-button">Удалить</button>
        

        <div class="likes">
            <span class="likes-counter">${item.like}</span>
            <button data-index='${index}' class="like-button ${item.paint}"</button>

    </div>
                </div >
                
              </li >
    `})
    .join('');
  const listHtml = `<ul id="ul" class="comments">
    ${commentsHtml}
  </ul>`
  app.innerHTML = listHtml;
  likes();
  initDeleteButtonsListeners();
  initEdit();
  
  answer();
  console.log(autoInfo)
  if (autoInfo) {
    renderForm();
  } else {
    renderFormButton();


  }







};