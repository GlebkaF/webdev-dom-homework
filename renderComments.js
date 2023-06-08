import { addComment } from "./api.js";
import { renderLogin } from "./renderLogin.js";
import { sanitizeHtml } from "./utils.js";
import { delay } from "./utils.js";

export const renderComments = (
    app,
  isPosting,
  isStarting,
  comments,
  user
) => {
  const likeButtonClass = "like-button";

  const commentsHTML = comments
    .map((comment, index) => {
      return `
       <li class="comment" data-index="${index}">
         <div class="comment-header">
           <div>${sanitizeHtml(comment.name)}</div>
           <div>${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}</div>
         </div>
         <div class="comment-body">
           <div class="comment-text">
             ${sanitizeHtml(
               comment.text
                 .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
                 .replaceAll("END_QUOTE%", "</div>")
             )}
           </div>
         </div>
         <div class="comment-footer">
           <div class="likes">
             <span class="likes-counter">${comment.likes}</span>
             <button data-index="${index}" class="${likeButtonClass} ${
        comment.isLiked ? "-active-like" : ""
      } ${comment.isLikeLoading ? "-loading-like" : ""}"></button>
           </div>
         </div>
       </li>
     `;
    })
    .join("");

  const appHtml = `
    <div class=container>
      <ul class='comments'>
      ${
        isStarting
          ? "<div class='loading'>Загрузка комментариев...</div>"
          : commentsHTML
      }
      </ul>
      ${
        user
          ? `
          <div class="add-form">
            <input
              type="text"
              class="add-form-name"
              placeholder="Введите ваше имя"
              id="name-input"
              value="${user.name}"
              disabled
            />
            <textarea
              type="textarea"
              class="add-form-text"
              placeholder="Введите ваш коментарий"
              rows="4"
              id="text-input"
            ></textarea>
            <div class="add-form-row">
              <button id="add-button" class="add-form-button">Написать</button>
            </div>
          </div>
      `
          : `<div class="form-loading" style="margin-top: 20px">
                Что бы добавить комментарий, <a href='#' id="go-to-login" href="">авторизуйтесь</a>
              </div>`
      }
      </div>`;
      
      app.innerHTML = appHtml;

  if (!isStarting && !isPosting) {
    for (const likeButton of document.querySelectorAll(`.${likeButtonClass}`)) {
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const comment = comments[likeButton.dataset.index];
        comment.isLikeLoading = true;
        renderComments(app, isPosting, isStarting, comments);
        delay(2000).then(() => {
          comment.likes = comment.isLiked
            ? comment.likes - 1
            : comment.likes + 1;
          comment.isLiked = !comment.isLiked;
          comment.isLikeLoading = false;
          renderComments(app, isPosting, isStarting, comments, user);
        });
      });
    }
    for (const comment of document.querySelectorAll(".comment")) {
      comment.addEventListener("click", () => {
        const text = document.getElementById("text-input");
        text.value = `%BEGIN_QUOTE${comments[comment.dataset.index].name}:
         ${comments[comment.dataset.index].text}END_QUOTE%`;
      });
    }

    if (!user) {
      const goToLogin = document.getElementById("go-to-login");
      goToLogin.addEventListener("click", (event) => {
        event.preventDefault();
        renderLogin(app, isPosting, isStarting, comments, user);
      });
    }

    if (user) {
      const addButton = document.getElementById("add-button");
      addButton.addEventListener("click", () => {
        const text = document.getElementById("text-input").value;
        // Добавить проверку на пустой текст, вывести сообщение об ошибке
        if (text) {
            addComment(text, user.token).then((response) => {
            renderComments(app, isPosting, isStarting, response, user);
          });
        }
      });
    }
  }
};
