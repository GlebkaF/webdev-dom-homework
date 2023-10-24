import { initAddLikes, initEdit, initQuotingComment, stopEmptyInput, stopPropagationForEditInput } from "./events.js";

export function renderComments(comments) {
    const listElement = document.querySelector(".comments");
    const commentsHtml = comments.map((comment, index) => {

        return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div class="comment-date">${comment.date}</div>
        </div>
        <div class="comment-body">
          ${comment.isEdited ?
                `<textarea type="textarea" class="edit-form-text" data-index="${index}" value="">${comment.text}</textarea>` :
                `<div class="comment-text">
                ${comment.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>")
                    .replaceAll("QUOTE_END", "</div>")}
                </div>`}
        </div>
          <button class="edit-button" data-index="${index}">${comment.isEdited ? `Coхранить` : `Редактировать`}</button>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCounter}</span>
            <button class="like-button ${comment.isLiked ? `-active-like` : ``} ${comment.isLikeLoading ? `-loading-like` : ``}" data-index="${index}"></button>
          </div>
        </div>
      </li>`

    }).join('');

    listElement.innerHTML = commentsHtml;

    initAddLikes(comments);
    initEdit(comments);
    initQuotingComment(comments);
    stopPropagationForEditInput();
    stopEmptyInput();
}