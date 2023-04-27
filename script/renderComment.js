import { getDate, arrComments } from "./script.js";

const comments = document.querySelector(".comments");

const renderComment = (id, name, text, date, isLike, likeCounter, isEdit) => {
  comments.innerHTML += ` 
          <li class="comment" data-index="${id}">
              <div class="comment-header">
              <div>${name}</div>
              <div>${date}</div>
              </div>
              <div class="comment-body">
                  ${
                    isEdit
                      ? `<textArea data-index="${id}" class="input-text">${text}</textArea>`
                      : `<div class="comment-text">${text}</div>`
                  }
                  <button data-index="${id}" class="edit-button">${
    isEdit ? "Сохранить" : "Редактировать"
  }</button>
              </div>
              <div class="comment-footer">
              <div class="likes">
                  <span class="likes-counter">${likeCounter}</span>
                  <button data-index="${id}" class="like-button ${
    isLike ? "-active-like" : ""
  }"></button>
              </div>
              </div>
          </li>
      `;
};

export const renderComments = () => {
  // перед рендером удаляем все комменты которые были, чтобы они не дублировались
  comments.innerHTML = "";

  arrComments.forEach((comment, index) =>
    // id не передаю - он поломанный
    renderComment(
      index,
      comment.author.name,
      comment.text,
      getDate(new Date(comment.date)),
      comment.isLiked,
      comment.likes,
      comment.isEdit
    )
  );
};
