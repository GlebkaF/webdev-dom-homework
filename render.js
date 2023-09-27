import { token } from "./api.js";
import { initEventListeners } from "./main.js";
import { renderRegister } from "./loginPage.js";
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return (
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join(".") +
    " " +
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(":")
  );
}

export function renderComments(comments) {
  const commentsListHtml = comments
    .map((comment, index) => {
      console.log(comment);
      return `
          <li class="comment" data-name="${comment.name}" data-text="${
        comment.text
      }" data-index="${index}">
              <div class="comment-header">
                  <div>${comment.name}</div>
                  <div>${formatDate(comment.date)}</div>
              </div>
              <div class="comment-body">
                  <div class="comment-text" style="white-space:pre-line">
                      ${comment.text}
                  </div>
              </div>
              <div class="comment-footer">
                  <div class="likes">
                      <span class="likes-counter">${comment.likes}</span>
                      <button class="like-button ${
                        comment.isLiked ? "-active-like" : ""
                      }">
                      </button>
                  </div>
              </div>
          </li>
          `;
    })
    .join("");
  const appElement = document.getElementById("app");
  const appHtml = `
		<div class='container'>
		<div id='container-preloader'>Пожалуйста подождите, загружаю комментарии..</div>
		<ul class='comments' id='list'>${commentsListHtml}
		</ul>
		<div id='container-preloader-post'></div>
		${
      token
        ? `<div class='add-form'>
			<input type='text' class='add-form-name' placeholder='Введите ваше имя' disabled value='${name}' />
			<textarea type='textarea' class='add-form-text' placeholder='Введите ваш коментарий' rows='4'></textarea>
					<div class='add-form-row'>
						<button class='add-form-button' id='add-button'>Написать</button>
					</div>
				</div>`
        : `<div class='authorization'>Чтобы добавить комментарий, <a href='index.html' id='authorization-link'>авторизуйтесь</a></div>`
    }
		</div>`;

  appElement.innerHTML = appHtml;
  const addForm = document.querySelector(".add-form");
  if (addForm) {
    initEventListeners();
  }
  const authorization = document.querySelector("#authorization-link");
  if (authorization) {
    authorization.addEventListener("click", (e) => {
      e.preventDefault();
      renderRegister();
    });
  }

  const commentsList = document.querySelector(".comments");
  commentsList.innerHTML = commentsListHtml;

  const commentListItems = commentsList.querySelectorAll(".comment");
  for (const commentListItem of commentListItems) {
    const likeButton = commentListItem.querySelector(".like-button");
    const commentIndex = commentListItem.dataset.index;
    const comment = comments[commentIndex];

    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      if (comment.isLiked) {
        comment.isLiked = false;
        comment.likes--;
      } else {
        comment.isLiked = true;
        comment.likes++;
      }

      renderComments(comments);
    });
  }
}
