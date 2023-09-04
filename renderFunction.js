import { editButton } from "./editButton.js";
import { likedFunction } from "./isliked.js";
import { answerElement } from "./main.js";
const boxMessages = document.querySelector('.comments');
export const renderFunction = ({ comments }) => {
    const commtentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class='quote'>
              <div class="comment-body">
              ${comment.isEdit? `<textarea data-index="${index}" class="edit-text white-space: pre-line">${comment.text}</textarea>` : `<div data-index="${index}" class="comment-text" style="white-space:pre-line">${comment.text
                .replaceAll("BEGIN_QUOTE", "<div class='quoteOne'>")
                .replaceAll("QUOTE_END", "</div>")}</div>`}
            </div>
              </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.like}</span>
                <button data-index="${index}" class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
              </div>
              
            </div>
            <button data-index="${index}" class="edit-button">${comment.isEdit? 'Сохранить' : 'Редактировать'}</button>
          </li>`
    }
  
    ).join("");
    boxMessages.innerHTML = commtentsHtml;
    likedFunction({ comments });
    editButton({ comments });
    answerElement();
  };


