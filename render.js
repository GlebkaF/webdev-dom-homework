import {initLikeListener} from "./main.js";
import { initDeleteButtonsListeners } from "./delbutton.js";
import { quoteCommets } from "./main.js";
const listElement = document.getElementById("comments");

export const renderComments = (commentList) => {
    const commentsHtml = commentList.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div id="add-name">${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div id="add-text" class="comment-text" >
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <button id="delete-form-button" class="delete-form-button" data-index="${index}">Удалить</button>
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
    }).join("");
    listElement.innerHTML = commentsHtml;
    initLikeListener();
    initDeleteButtonsListeners();
    quoteCommets();
};