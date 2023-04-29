//import { newComment } from './api.js';
import { fetchComments } from './api.js';
import renderLike from './renderComment.js';
import { commentInfoNotEdit } from './commentsList.js';

const commentElement = document.querySelector(".comments");
const load = document.querySelector(".load");

load.textContent = "Подождите, пожалуйста, комментарии загружаются...";

fetchComments();
//newComment();
renderLike(commentElement, commentInfoNotEdit);
console.log(renderLike);
