import { sanitizeHtml } from "./sanitize.js";
import { likeElementfunction } from "./likeFunction.js";

export const renderComments = (comments) => {
    const commentsElement = document.querySelector('.comments');
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
        <div class="comment-header" data-index="${index}">
          <div>${sanitizeHtml(comment.name)}</div>
          <div>${comment.time}</div>
        </div>
        <div class="comment-body"> 
          ${(comment.isEdit)
                ? `<textarea type="textarea" class="add-form-text change-comment"  placeholder="Введите ваш коментарий" rows="4">${comment.text}</textarea>`
                : `<div class="comment-text" data-index="${index}">
            ${sanitizeHtml(comment.text)}
          </div>`}
          
          <button class="add-form-button edit-form-button" data-index="${index}" > ${(comment.isEdit) ? `Сохранить` : `Изменить`} </button>
       
          </div>
         
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="like-button ${(comment.icon) ? "-active-like" : ""}" ></button>
          </div>
        </div>
      </li>`;
    }).join("");

    commentsElement.innerHTML = commentsHtml;

    likeElementfunction({comments, renderComments});
    

};