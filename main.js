import {pageLoaded, commentSend} from './answers.js'
import {fetchPromisePost, fetchPromise} from './api.js'
import {getLike } from './likes.js'
import {checkInput } from './validation.js'
import {nameInputElement, commentInputElement, buttonElement} from './constants.js'
import { answerComment } from "./answers.js";

nameInputElement.style="comment-header";
nameInputElement.addEventListener("input", checkInput)
commentInputElement.addEventListener("input", checkInput)

pageLoaded()
fetchPromise()

// function getLike(index) {
//   if (!comments[index].isLiked) {
//     comments[index].likes++
//   } else {
//     comments[index].likes--
//   }
//   comments[index].isLiked = !comments[index].isLiked;
//   renderComments();
// }
// const answerComment = (index) => {
//     commentInputElement.value = `> ${comments[index].comment} \n ${comments[index].name},`;
// } 

// function answerComment(index) {
//   commentInputElement.value = `> ${comments[index].comment} \n ${comments[index].name},`;
// } 

buttonElement.addEventListener("click", () => {
  if (!nameInputElement.value || !commentInputElement.value) {
    return;
  }
  commentSend();
  fetchPromisePost();
});

console.log("It works!");