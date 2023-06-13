
"use strict";
export let comments = [];

import { renderApp } from './module/render.js'; //обращаемся к рендер функции

renderApp (comments)


// КНОПКА УДАЛЕНИЯ ПЕРЕСТАЛА РАБОТЬ , Пришлось убрать ее

// //Удаление последнего комментария
// const listElement = document.getElementById('listComments');
// const deleteComment = document.getElementById('delComment')
// deleteComment.addEventListener('click', () => {
//   const lastCommentIndex = listElement.innerHTML.lastIndexOf(`<li class="comment">`);
//   if (lastCommentIndex !== -1) {
//     listElement.innerHTML = listElement.innerHTML.substring(0, lastCommentIndex)
//   }
//   comments.pop();
//   renderComments();
// });


console.log("It works!");
