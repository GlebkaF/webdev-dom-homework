import { comment } from "./api.js";

const getListElemenets = (comment, index) => {
  return `<li class="comment">
                     <div class="comment-header">
                       <div>${comment.author.name}</div>
                       <div>${comment.date}</div>
                     </div>
                     <div class="comment-body">
                       <div class="comment-text" data-text="${comment.text}">
                         ${comment.text}
                       </div>
                     </div>
                     <div class="comment-footer">
                       <div class="likes">
                         <span class="likes-counter">${comment.likes}</span>
                         <button class="${
                           comment.isLiked
                             ? "like-button -active-like"
                             : "like-button"
                         }" data-index="${index}"></button>
                       </div>
                     </div>
                   </li>`;
};

export default getListElemenets;
