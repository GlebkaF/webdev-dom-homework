import { dateString } from "./date.js"; 
import { likeListener } from "./likes.js";
import { activeLike } from "./likes.js";
import { answerComment } from "./answers.js";
import { editComment } from "./edit.js";

export function renderList({commentsArray, commentsElement}) {
      const commentsHtml = commentsArray.map((comment, index) => {
    
        return `<li class="comment">
          <div class="comment-header">
            <div class="comment-name" data-index="${index}">${comment.author.name}</div>
            <div>${dateString(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text" data-index="${index}">
              ${comment.text}
            </div>
            <textarea class="comment-edit-text hide-elem">${commentsArray[index].text}</textarea>
          </div>
          <div class="comment-footer">
            <button class="edit-button" data-index="${index}">Редактировать</button>
            <button class="save-edit-button hide-elem" data-index="${index}">Сохранить</button>
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${activeLike(comment)}" data-index="${index}"></button>
            </div>
          </div>
        </li>`
      }).join('');

      commentsElement.innerHTML = commentsHtml; 
      likeListener({commentsArray, commentsElement});
      answerComment();
      editComment({commentsArray, commentsElement});
    };