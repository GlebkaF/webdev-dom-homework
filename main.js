import {pageLoaded, commentSend} from './answers.js'
import {fetchPromisePost, fetchPromise, fetchLogin} from './api.js'
import {checkInput } from './validation.js'
import {nameInputElement, commentInputElement, buttonElement, addForm} from './constants.js'

nameInputElement.style="comment-header";
nameInputElement.addEventListener("input", checkInput)
commentInputElement.addEventListener("input", checkInput)

pageLoaded()
fetchPromise()
fetchLogin()
addForm.style.display = "none"

buttonElement.addEventListener("click", () => {
  if (!nameInputElement.value || !commentInputElement.value) {
    return;
  }
  commentSend();
  fetchPromisePost();
});

console.log("It works!");