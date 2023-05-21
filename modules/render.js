// import { getComments, postComment } from "./api.js";
// import { addErrors, getDate, addLikeButton } from "./helper.js";

  const listElement = document.getElementById('list'); 
  const commentsListElement = document.getElementById('comments-list');
  const nameElement = document.getElementById('name');
  const commentsElement = document.getElementById('comments');

  

export const renderCommentList = (commentList) => {
    const commentHtml = commentList.map((comment, index) => {
    return `<li class="comment data-comment-content="${index}">
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
                  <button class="like-button ${comment.activeClass}" data-button-like="${index}"></button>
                </div>
              </div>
            </li>`
      }).join('');
      listElement.innerHTML = commentHtml;
    };
