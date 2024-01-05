import { objOfConst } from "./constant.js";
import { initLikeListeners, initReplyListeners } from "./inits.js";

export function renderComments() {
    objOfConst.addingText.style.opacity = "0";
  
    objOfConst.listElement.innerHTML = objOfConst.comments.map((comment, index) => {
        return `<li class="comment" data-comment="${index}">
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
            <button class="like-button ${
              comment.isLiked ? "-active-like" : ""
            }" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
      })
      .join("");
  
    initReplyListeners();
    initLikeListeners();
  };