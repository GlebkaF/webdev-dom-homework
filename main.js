"use strict";

import { loadComments, postComment, fetchLogin, toggleLike, deleteComment } from "./api.js";
import { renderComments } from "./render.js";
import { renderLogin } from "./renderLogin.js";
import { format } from "date-fns";

const app = document.getElementById("app");

let comments = [];
let isInitialLoading = true;
let isPosting = false;
let user;
let postError = '';
let loginError = '';

function renderPage() {
  renderComments(
    app,
    isPosting,
    postError,
    isInitialLoading,
    comments,
    user,
    onPostSubmit,
    onLoginSubmit,
    loginError,
    onToggleLike,
    onDeleteClick
  );
}

function getComments() {
  return loadComments()
  .then((responseData) => {
    isInitialLoading = false;
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss"),
        text: comment.text,
        likes: comment.likes,
        favorite: false,
        id: comment.id
      };
    });
    comments = appComments;
    renderPage();
  });
}

function onToggleLike(commentID) {
  toggleLike(commentID, user.token)
    .then(() => {
      getComments();
    })
    .catch((error) => {
      alert(error.message);
    })
}

function onDeleteClick() {
  const lastComment = comments[comments.length - 1];
  deleteComment(lastComment.id, user.token)
    .then(() => {
      getComments();
    })
    .catch((error) => {
      alert(error.message);
    })
}

function onPostSubmit(text) {
  isPosting = true;
  renderPage();

  const replacedText = text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  postComment(replacedText, user.token)
    .then(() => {
      isPosting = false;
      postError = '';
      getComments();
    })
    .catch((error) => {
      isPosting = false;

      if (error.message === 'Сервер сломался, попробуй позже' || error.message === 'Имя и комментарий должны быть не короче 3 символов') {
        postError = error.message;
      } else {
        postError = "Кажется, у вас сломался интернет, попробуйте позже";
      }

      renderPage();
    }); 
}

function onLoginSubmit(login, password) {
  return fetchLogin(login, password).then((response) => {
    user = response.user;
    loginError = '';
    renderPage();
  })
  .catch((error) => {
    loginError = error.message;
    renderLogin(app, onLoginSubmit, loginError);
  });
}

getComments();
