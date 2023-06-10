
import { renderLoginComponent } from "./login-component.js";
import { initApp } from "./main.js";
import { isUserAuthorization, newComment } from "./api.js";

const getListCommentsEdit = (comment, index) => {
  let isLike = comment.isLike ? "-active-like" : "";
  return `<li class="comment">
        <div class="comment-header">
          <div id="name">${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div id="text" data-index="${index} class="comment-text" style={{ whiteSpace: 'pre-line' }}>
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
}


export const renderComments = ({ comments, handleCommentAnswerClick, handleCommentLikeClick }) => {
  const appEl = document.getElementById("app");
  const nameUser = localStorage.getItem('user');
  const commentsHtml = comments.map((comment, index) => getListCommentsEdit(comment, index))
    .join('');
  const appShowHtml = `
  <ul id="list" class="comments">
    <!--список рендериться из JS -->
    ${commentsHtml}
  </ul>`
  const showInputButtonComment = `
    <div class="add-form" id="form-comment">
      <input type="text"
       class="add-form-name" placeholder="Введите ваше имя"
       id="add-name" 
       disabled="disabled"
      value = "${nameUser}" 
      />
      <textarea type="textarea" class="add-form-text" 
      placeholder="Введите ваш коментарий" rows="4"
        id="add-text"></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
        <button id="add-delete" class="delete-button" data-index="${index}">Удалить</button>
      </div>
    </div>
  </div>
  `
  const textEnter = `<div id="toggle-page">Чтобы добавить комментарий, авторизируйтесь</div>
  </div>`
  const addComments = () => {
    const buttonElement = document.getElementById("add-button");
    buttonElement.addEventListener("click", () => {
      const commentForm = document.getElementById("form-comment");

      const textElement = document.getElementById("add-text");
      commentForm.style.display = 'none';
      const commentAddingMessage = document.createElement('div');
      commentAddingMessage.innerText = 'Комментарий добавляется...';
      commentForm.parentNode.insertBefore(commentAddingMessage, commentForm);

      textElement.classList.remove("error");
      if (textElement.value === "" && commentInputElement.value.length < 3) {
        textElement.classList.add("error");
        alert("Введите комментарий более 3-х символов")
        commentAddingMessage.style.display = "none";
        commentForm.style.display = "block";
        return;
      }
      newComment(textElement.value)
        .then(() => {
          initApp();
        })
        .then(() => {
          textElement.value = "";
        })
        .catch((error) => {
          if (error.message === "Ошибка сервера") {
            alert("Сервер сломался, попробуй позже");
            return;
          };
          if (error.message === "Неверный запрос") {
            alert("Имя и комментарий должны быть не короче 3 символов");
            return;
          } else {
            alert("У вас проблемы с интернетом");
            return;
          };
        });
    });
  };
  const initAppRender = () => {
    let appHtml = '';
    if (!isUserAuthorization()) {
      appHtml = `<div id="commentsContainer">
    <div class="container" id="container" >
    ${appShowHtml} ${textEnter}
    </div>
    </div>`
      appEl.innerHTML = appHtml;
      document.getElementById('toggle-page').addEventListener("click", () => {
        renderLoginComponent({ appEl, initApp });
      })
    } else {
      appHtml = `<div id="commentsContainer">
  <div class="container" id="container" >
  ${appShowHtml} ${showInputButtonComment}
  </div>
  </div>`
      appEl.innerHTML = appHtml;
      addComments();
    }
  }

  initAppRender()
  initLikeButtonListener(handleCommentLikeClick);
  initAnswerButton(handleCommentAnswerClick);
  deleteButton(handleCommentDeleteClick);
}

export const initLikeButtonListener = (handleCommentLikeClick) => {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (let likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener("click", handleCommentLikeClick);
  }
};
export const initAnswerButton = (handleCommentAnswerClick) => {
  const commentsAnswers = document.querySelectorAll(".comment-text");
  for (let commentsAnswer of commentsAnswers) {
    commentsAnswer.addEventListener("click", handleCommentAnswerClick);
  }
};
export const deleteButton = (handleCommentDeleteClick) => {
  const deleteButtonElements = document.querySelectorAll(".delete-button");
  for (let deleteButtonElement of deleteButtonElements) {
    deleteButtonElement.addEventListener("click", handleCommentDeleteClick);
  }
};