import { initDeliteButtonsListeners, initEventlikes } from "./Initialization.js";
import { answerText } from "./answer.js";

const commentsElement = document.getElementById("comments");

export const renderComments = (comments) => {
  const appElement = document.getElementById("app");

    const commentsHtml = comments
      .map((comment, index) => {
        return ` <li class="comment">
            <div class="comment-header">
              <div class="comment-name" data-index="${index}">${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text" data-index="${index}">
              ${comment.text}
              </div>
            </div>  
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button"></button>
              </div>
            </div>
          </li> `;
      })
      .join("");

      const appHtml = `
      <div class="container">
      <ul class="comments" id="comments">${commentsHtml}
       <!-- Список рендерится из JS-->
      </ul>
      <button class="delete-button">Удалить последний элемент</button>
      <div class="add-form">
        <input
          type="text" id="name-input"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea
          type="textarea" id="textarea-input"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button">Написать</button>
        </div>
       </div>
      </div>`
  
    appElement.innerHTML = appHtml;
    
      

    answerText();
    initEventlikes();
    initDeliteButtonsListeners(comments);
    
  };