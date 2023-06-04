import { delay, correctDate } from "/supportFunc.js";

const addCommentForm = document.querySelector(".add-form");
const buttonElement = document.querySelector(".add-form-button");
const listOfComments = document.querySelector(".comments");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");
const constWaitingComment = document.querySelector('.add-waiting'); // Комментарий добавляется...


// Функция render
const renderComments = (isLoading, isWaitingComment, comments) => {

  // Лоадинг на загрузку комментариев на страницу
  if (isLoading) {
    document.getElementById('comments').innerHTML =
      'Пожалуйста подождите, загружаю комментарии...';
    constWaitingComment.classList.add(`hidden`);
    return;
  }

  // Рендер
  listOfComments.innerHTML = comments
    .map((comment, index) => {
      return `<li id="comment" class="comment" data-index="${index}">
      <div class="comment-header">
        <div id="name">${comment.author.name}</div>
        <div id="date">${correctDate(comment.date)}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index="${index}" id="like-button" class="like-button
          ${comment.isLiked ? '-active-like' : ''}
          ${comment.isLikeLoading ? '-loading-like' : ''}">
          </button>
        </div>
      </div>
    </li>`
    }).join("");

  // Функция лоадинг при добавлении комментариев в ленту
  const waitingAddComment = () => {
    if (isWaitingComment) {
      constWaitingComment.classList.remove(`hidden`);
      addCommentForm.classList.add(`hidden`);
    } else {
      constWaitingComment.classList.add(`hidden`);
      addCommentForm.classList.remove(`hidden`);
    }
  };
  waitingAddComment();


  // Добавление клика на лайк
  const initLikeButtons = () => {
    const likeButtonsElements = document.querySelectorAll(".like-button");

    for (const likeButtonsElement of likeButtonsElements) {

      likeButtonsElement.addEventListener('click', (event) => {
        event.stopPropagation();

        let comment = comments[likeButtonsElement.dataset.index];
        comment.isLikeLoading = true;

        renderComments(isLoading, isWaitingComment, comments);

        // Инициализация задержки при обработке лайка на комментарий
        delay(2000).then(() => {
          if (comment.isLiked) {
            comment.likes = comment.likes - 1;
          } else {
            comment.likes = comment.likes + 1;
          }

          comment.isLiked = !comment.isLiked;
          comment.isLikeLoading = false;
          renderComments(isLoading, isWaitingComment, comments);
        });
      });
    }
  }
  initLikeButtons();


  // Добавление ответа на комментарии
  const answerComment = () => {
    const commentElements = document.querySelectorAll('.comment');

    for (let element of commentElements) {
      element.addEventListener('click', () => {
        let index = element.dataset.index;

        commentInputElement.value = `START_QUOTE${comments[index].author.name}:
          \n${comments[index].text.replaceAll('<div class="comment-quote">', 'START_QUOTE').replaceAll('</div>', 'END_QUOTE')}END_QUOTE`;
      });
    }
  }
  answerComment();

  // валидация на ввод (неактивная кнопка "Написать")
  const checkAddButton = () => {
    nameInputElement.addEventListener('input', () => {
      if (nameInputElement.value) {
        buttonElement.disabled = false;
        return;
      } else {
        buttonElement.disabled = true;
        return;
      }
    });

    commentInputElement.addEventListener('input', () => {
      if (commentInputElement.value) {
        buttonElement.disabled = false;
        return;
      } else {
        buttonElement.disabled = true;
        return;
      }
    });
  }
  checkAddButton();
}

export { renderComments };