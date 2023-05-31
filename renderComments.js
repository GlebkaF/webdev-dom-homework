import {
    addCommentForm,
    buttonElement,
    listOfComments,
    nameInputElement,
    commentInputElement,
    removeButton,
    constWaitingComment,
    startingElement
} from "./data.js";

import { delay, replaceValue, correctDate } from "./supportFunc.js";


// Функция render // в render.js
const renderComments = (element, comments) => {
    // Рендер
    element.innerHTML = comments.map(comment => {
        return `
        <li id="comment" class="comment">
        <div class="comment-header">
          <div id="name">${comment.author.name}</div>
          <div id="date">${correctDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.text}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button id="like-button" class="like-button ${comment.isLiked ? '-active-like' : ''} ${comment.isLikeLoading ? '-loading-like' : ''}"></button>
          </div>
        </div>
      </li>`
    }).join("");

    // Добавление клика на лайк // в render.js
    [...document.querySelectorAll(".like-button")]
        .forEach((like, index) => {
            like.addEventListener('click', event => {
                event.stopPropagation();

                comments[index].isLikeLoading = true;

                renderComments(element, comments);

                // Инициализация задержки при обработке лайка на комментарий
                delay(2000)
                    .then(() => {
                        comments[index].isLiked ? comments[index].likes-- : comments[index].likes++;

                        comments[index].isLiked = !comments[index].isLiked;
                        comments[index].isLikeLoading = false;

                        renderComments(element, comments);
                    });
            });
        });

    // Добавление ответа на комментарии // в render.js
    [...document.querySelectorAll('.comment')]
        .forEach((comment, index) => {
            comment.addEventListener('click', () => {
                commentInputElement.value = `START_QUOTE${comments[index].author.name}:
            \n${comments[index].text.replaceAll('<div class="comment-quote">', 'START_QUOTE').replaceAll('</div>', 'END_QUOTE')}END_QUOTE`;
            });
        });
}

export default renderComments;