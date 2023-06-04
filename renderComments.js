import { delay, correctDate } from "/supportFunc.js";
import { renderLogin } from "/renderLogin.js";

const addCommentForm = document.querySelector(".add-form");
const buttonElement = document.querySelector(".add-form-button");
const listOfComments = document.querySelector(".comments");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");
const constWaitingComment = document.querySelector('.add-waiting'); // Комментарий добавляется...



// // ОСТАВИТЬ
//     const ///// = `<div class="container">
//             <ul id="comments" class="comments">
//               ${commentHTML}
//             </ul>
//             <div class="add-form">
//               <input type="text" id="add-form-name" class="add-form-name" placeholder="Введите ваше имя" />

//               <textarea type="textarea" id="add-form-text" class="add-form-text" placeholder="Введите ваш коментарий"
//                 rows="4"></textarea>

//               <div class="add-form-row">
//                 <button type="button" id="add-form-button" class="add-form-button" disabled>Написать</button>
//                 <button class="remove-form-button">Удалить последний</button>
//               </div>
//             </div>
//             <p class="add-waiting hidden">Комментарий добавляется...</p>
//           </div>

//           <div class="registration">
//           <div class="add-form">
//             <h3>Форма ввода</h3>
//             <div class="reg-input">
//               <input type="text" id="add-login" class="add-login" placeholder="Введите логин" />
//               <input type="text" id="add-password" class="add-password" placeholder="Введите пароль"></input>
//             </div>
//             <div class="add-reg-form">
//               <button type="button" id="in-button" class="in-button">Войти</button>
//               <button class="reg-button">Зарегистрироваться</button>
//             </div>
//           </div>
//         </div>
//           `

//     appEl.innerHTML = /////;

// Функция render
const renderComments = (
  app,
  isLoading,
  isWaitingComment,
  comments,
  user) => {

  // Лоадинг на загрузку комментариев на страницу
  if (isLoading) {
    document.getElementById('comments').innerHTML =
      'Пожалуйста подождите, загружаю комментарии...';
    constWaitingComment.classList.add(`hidden`);
    return;
  }

  // Рендер
  const commentHTML = comments
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

  const appHtml = `
  <div class="container">
      <ul id="comments" class="comments">

      ${isLoading // пока не работает
      ? "<p class='add-waiting hidden'>Комментарий добавляется...</p>"
      : commentHTML
    }
       </ul>
    ${user
      ? `
      <div class="container">
           <ul id="comments" class="comments">
             ${commentHTML}
           </ul>
           <div class="add-form">
              <input type="text"
              id="add-form-name"
              class="add-form-name"
              value="${user.name}"
              placeholder="Введите ваше имя" />
              
              <textarea
              type="textarea"
              id="add-form-text"
              class="add-form-text"
              placeholder="Введите ваш коментарий"rows="4">
              </textarea>

                <div class="add-form-row">
                  <button type="button" id="add-form-button" class="add-form-button" disabled>Написать</button>

                  <button class="remove-form-button">Удалить последний</button>
                </div>
            </div>
               <p class="add-waiting hidden">Комментарий добавляется...</p>
             </div>`
      : `<div class="form-loaging" style="margin-top: 20px">
      Чтобы добавить комментарий, <a href=" " id="go-to-login">Авторизуйтесь</a>
    </div>`
    }
    </div>`;

  app.innerHTML = appHtml;

  // Функция лоадинг при добавлении комментариев в ленту
  // const waitingAddComment = () => {
  //   if (isWaitingComment) {
  //     constWaitingComment.classList.remove(`hidden`);
  //     addCommentForm.classList.add(`hidden`);
  //   } else {
  //     constWaitingComment.classList.add(`hidden`);
  //     addCommentForm.classList.remove(`hidden`);
  //   }
  // };
  // waitingAddComment();


  // Добавление клика на лайк
  const initLikeButtons = () => {
    const likeButtonsElements = document.querySelectorAll(".like-button");

    for (const likeButtonsElement of likeButtonsElements) {

      likeButtonsElement.addEventListener('click', (event) => {
        event.stopPropagation();

        let comment = comments[likeButtonsElement.dataset.index];
        comment.isLikeLoading = true;

        renderComments(app, isLoading, isWaitingComment, comments, user);

        // Инициализация задержки при обработке лайка на комментарий
        delay(2000).then(() => {
          if (comment.isLiked) {
            comment.likes = comment.likes - 1;
          } else {
            comment.likes = comment.likes + 1;
          }

          comment.isLiked = !comment.isLiked;
          comment.isLikeLoading = false;
          renderComments(app, isLoading, isWaitingComment, comments, user);
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
\n${comments[index].text.replaceAll('<div class="comment-quote">', 'START_QUOTE').replaceAll('</div>', 'END_QUOTE')} END_QUOTE`;
      });
    }
  }
  answerComment();

  const goGoLogin = document.getElementById("go-to-login");
  goGoLogin.addEventListener("click", (event) => {
    event.preventDefault();
    renderLogin(app, isLoading, isWaitingComment, comments);
  })

  // // валидация на ввод (неактивная кнопка "Написать")
  // const checkAddButton = () => {
  //   nameInputElement.addEventListener('input', () => {
  //     if (nameInputElement.value) {
  //       buttonElement.disabled = false;
  //       return;
  //     } else {
  //       buttonElement.disabled = true;
  //       return;
  //     }
  //   });

  //   commentInputElement.addEventListener('input', () => {
  //     if (commentInputElement.value) {
  //       buttonElement.disabled = false;
  //       return;
  //     } else {
  //       buttonElement.disabled = true;
  //       return;
  //     }
  //   });
  // }
  // checkAddButton();
}

export { renderComments };