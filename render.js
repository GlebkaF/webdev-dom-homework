import { listElement } from "./main.js";
import { initAnswerButton } from "./main.js";
import { initLikeButtonListener } from "./main.js";
export const renderComments = (comments) => {
    const commentsHtml = comments.map((comment, index) => {

        let isLike = '';
        if (comments[index].isLiked) {
            isLike = '-active-like'
        }
        return `<li class="comment">
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
              <span class="likes-counter ">${comment.like}</span>
              <button class="like-button  ${isLike}" data-index="${index}"></button>
            </div>
          </div>
        </li>`


    }).join('');
    listElement.innerHTML = commentsHtml;
    initLikeButtonListener();
    initAnswerButton();
};
