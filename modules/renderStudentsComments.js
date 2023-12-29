import { initLikeListeners } from "./initLikelisteners.js";
import {initAnswerComments} from "./initAnswerComments.js";

// Рендер-функция отрисовывает новые комменты
const listElement = document.getElementById('list');
export const renderStudentsComments = ({studentsComments, fetchAndRenderComments}) => {

    const studentsHtml = studentsComments
    .map((comment, index) => {
        return `<li class="comment" data-index="${index}">
<div class="comment-header">
<div>${comment.name}</div>
<div>${comment.date}</div>
</div>
<div class="comment-body">
<div class="comment-text">
  ${comment.text}
</div>
</div>
<div class="comment-footer">
<div class="likes">
  <span class="likes-counter">${comment.likes}</span>
  <button class="like-button ${studentsComments[index].isLiked ? "-active-like" : ""}" data-index="${index}"></button>
</div>
</div>
</li>`;
    })
        .join("");
    // console.log(studentsHtml);
    listElement.innerHTML = studentsHtml;
    initLikeListeners();
    initAnswerComments();

}