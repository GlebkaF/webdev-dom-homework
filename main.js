import { getElements, postElements, showAddForm, hideAddForm, deleteLoadingIndicatorComments, showLoadingIndicator, deleteLoadingIndicator, correctDate, getToken } from "./api.js";
import { renderComments, addComment, hideAuthForm, showAuthForm } from "./render.js"
import { userAutorisation } from "./login.js"
"use strict";

userAutorisation();


let isAutorizated = false;

const listElements = document.getElementById("list");
const nameElement = document.querySelector('.add-form-name');
const textElement = document.querySelector('.add-form-text');
const buttonElements = document.querySelector('.add-form-button');
const deleteButtonElement = document.querySelector('.delete-button');
export let comments = [];

export function getComments() {
  return comments
}

export const сomments = (newComments) => {
  comments = newComments;
}

export function getFetch() {

  showLoadingIndicator();
  hideAddForm();


  getElements().then((responseData) => {
    const appComment = responseData.comments.map((comment) => {

      return {
        name: comment.author.name,
        date: correctDate(comment.date),
        text: comment.text,
        likes: comment.likes,
        islike: false,
      }
    });
    comments = appComment
    renderComments(comments);
    deleteLoadingIndicator();
    if (getToken()) {
      hideAuthForm();
      showAddForm();

    } else {
      showAuthForm();
    }

  })
    .catch((error) => {
      console.log(error);
      alert('Что-то пошло не так, попробуйте позже');
    });


}
getFetch();


const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");



addComment();