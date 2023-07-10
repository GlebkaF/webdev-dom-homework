import { listElement } from "./main.js";
import { clickForAnswer } from "./clickForAnswer.js";
import { checkFields } from "./checkFields.js";
import { getLikes } from "./getLikes.js";
import { getCorrectComments } from "./getCorrectComments.js";


//Ренден функция
export const renderComments = ({ comments }) => {
    let commentsHTML = comments.map((comment, index) => {
        return ` <li id="comment-list" class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.isEdit ? `<textarea
          id="correct-textarea"
          type="textarea"
          class="add-form-text"
          rows="4"
        >${comment.text}</textarea>` : `${comment.text}` }
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.counter}</span>
          <button data-index="${index}" 
          class="like-button${comment.isLiked ? " -active-like" : ""}">
          </button>
        </div>
      </div>
      <div class="add-form-row">
          <button data-index="${index}" class="add-correct-button">${comment.isEdit ? 'Сохранить' : 'Редактировать'}</button>
        </div>
    </li>`
    }).join('');
  
    listElement.innerHTML = commentsHTML;
  
    clickForAnswer({ comments, renderComments });
    checkFields();
    getLikes({ comments, renderComments });
    getCorrectComments({ comments, renderComments });
  }