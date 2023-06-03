// // Переменные
// const addCommentForm = document.querySelector(".add-form");
// const buttonElement = document.querySelector(".add-form-button");
// const listOfComments = document.querySelector(".comments");
// const nameInputElement = document.querySelector(".add-form-name");
// const commentInputElement = document.querySelector(".add-form-text");
// const constWaitingComment = document.querySelector('.add-waiting');
// const startingElement = document.querySelector('.starting');


// // Импорты
// import { delay, replaceValue, correctDate } from "./supportFunc.js";


// // Функция render
// const renderComments = (comments) => {

//   const appHTML = document.getElementById("app");

//   const commentHTML = comments
//     .map(comment => {
//       return `
//         <li id="comment" class="comment">
//         <div class="comment-header">
//           <div id="name">${comment.author.name}</div>
//           <div id="date">${correctDate(comment.date)}</div>
//         </div>
//         <div class="comment-body">
//           <div class="comment-text">${comment.text}</div>
//         </div>
//         <div class="comment-footer">
//           <div class="likes">
//             <span class="likes-counter">${comment.likes}</span>
//             <button id="like-button" class="like-button
//             ${comment.isLiked ? '-active-like' : ''}
//             ${comment.isLikeLoading ? '-loading-like' : ''}">
//             </button>
//           </div>
//         </div>
//       </li>`
//     }).join("");


//   const appEl = `<div class="container">
//           <ul id="comments" class="comments">
//             <!-- Список рендерится в js -->
//             ${commentHTML}
//           </ul>
//           <p class="starting hidden">Список загружается...</p>
//           <div class="add-form">
//             <input type="text" id="add-form-name" class="add-form-name" placeholder="Введите ваше имя" />

//             <textarea type="textarea" id="add-form-text" class="add-form-text" placeholder="Введите ваш коментарий"
//               rows="4"></textarea>

//             <div class="add-form-row">
//               <button type="button" id="add-form-button" class="add-form-button" disabled>Написать</button>
//               <button class="remove-form-button">Удалить последний</button>
//             </div>
//           </div>
//           <p class="add-waiting hidden">Комментарий добавляется...</p>
//         </div>

//         <div class="registration">
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
//         </div>`

//   appHTML.innerHTML = appEl;

//   // Переменные
//   const addCommentForm = document.querySelector(".add-form");
//   const buttonElement = document.querySelector(".add-form-button");
//   const listOfComments = document.querySelector(".comments");
//   const nameInputElement = document.querySelector(".add-form-name");
//   const commentInputElement = document.querySelector(".add-form-text");
//   const constWaitingComment = document.querySelector('.add-waiting');
//   const startingElement = document.querySelector('.starting');
// }

// export { renderComments };



// // // Функция render
// // const renderComments = (element, comments) => {
// //   // Рендер
// //   element.innerHTML = comments.map(comment => {
// //     return `
// //         <li id="comment" class="comment">
// //         <div class="comment-header">
// //           <div id="name">${comment.author.name}</div>
// //           <div id="date">${correctDate(comment.date)}</div>
// //         </div>
// //         <div class="comment-body">
// //           <div class="comment-text">${comment.text}</div>
// //         </div>
// //         <div class="comment-footer">
// //           <div class="likes">
// //             <span class="likes-counter">${comment.likes}</span>
// //             <button id="like-button" class="like-button ${comment.isLiked ? '-active-like' : ''} ${comment.isLikeLoading ? '-loading-like' : ''}"></button>
// //           </div>
// //         </div>
// //       </li>`
// //   }).join("");

// //   // Добавление клика на лайк
// //   [...document.querySelectorAll(".like-button")]
// //     .forEach((like, index) => {
// //       like.addEventListener('click', event => {
// //         event.stopPropagation();

// //         comments[index].isLikeLoading = true;

// //         renderComments(element, comments);

// //         // Инициализация задержки при обработке лайка на комментарий
// //         delay(2000)
// //           .then(() => {
// //             comments[index].isLiked ? comments[index].likes-- : comments[index].likes++;

// //             comments[index].isLiked = !comments[index].isLiked;
// //             comments[index].isLikeLoading = false;

// //             renderComments(element, comments);
// //           });
// //       });
// //     });
// // }