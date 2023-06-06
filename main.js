"use strict";

import { loadComments, postComment, fetchLogin, toggleLike, deleteComment } from "./api.js";
import { renderComments } from "./render.js";
import { renderLogin } from "./renderLogin.js";

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
        date: normalDate(new Date(comment.date)),
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

function normalDate(date) {
  let today = date;
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let years = today.getFullYear();
  let hours = today.getHours();
  let minutes = today.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes
  }

  if (day < 10) {
    day = "0" + day
  }

  if (month < 10) {
    month = "0" + month
  }

  years = String(years).slice(2);

  return `${day}.${month}.${years} ${hours}:${minutes}`;
}

getComments();
