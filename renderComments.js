import { initDeliteButtonsListeners, initEventlikes } from "./Initialization.js";
import { answerText } from "./answer.js";

const commentsElement = document.getElementById("comments");

export const renderComments = (comments) => {
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
  
    commentsElement.innerHTML = commentsHtml;
    answerText();
    initEventlikes();
    initDeliteButtonsListeners(comments);
  };