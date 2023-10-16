import {
  getFetch,
  showAddForm,
  hideAddForm,
  showLoadingIndicatorComments,
  deleteLoadingIndicatorComments,
  showLoadingIndicator,
  deleteLoadingIndicator
} from "./api.js";
import {
  renderElementsApi
} from "./render.js";
"use strict";
const listElements = document.getElementById("list");
const nameElement = document.querySelector('.add-form-name');
const textElement = document.querySelector('.add-form-text');
const buttonElements = document.querySelector('.add-form-button');
const deleteButtonElement = document.querySelector('.delete-button');
let comments = [];

function correctDate(date) {
  let currentDate = new Date(date);
  let todayDay = currentDate.getDate();
  let todayMonth = currentDate.getMonth() + 1;
  let todayYear = String(currentDate.getFullYear()).slice(-2);
  let todayHours = currentDate.getHours();
  let todayMinutes = currentDate.getMinutes();
  todayDay = todayDay < 10 ? "0" + todayDay : todayDay;
  todayMonth = todayMonth < 10 ? "0" + todayMonth : todayMonth;
  todayHours = todayHours < 10 ? "0" + todayHours : todayHours;
  todayMinutes = todayMinutes < 10 ? "0" + todayMinutes : todayMinutes;
  let formattedDate = `${todayDay}.${todayMonth}.${todayYear} ${todayHours}:${todayMinutes} `;
  return formattedDate;
}

showLoadingIndicator();
hideAddForm();
getFetch().then((responseData) => {
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
  renderElements();
  deleteLoadingIndicator();
  showAddForm();
})
getFetch();

function renderElements() {
  renderElementsApi(comments);
  commentOnComment();
  deleteComment();
  addLike();
  addComment();
}

function addLike() {
  const likeElements = document.querySelectorAll('.like-button');
  for (let like of likeElements) {
    like.addEventListener('click', (event) => {
      event.stopPropagation();
      let index = like.dataset.index
      let object = comments[index];
      if (object.islike) {
        object.islike = false;
        object.likes--;
      } else {
        object.islike = true;
        object.likes++;
      }
      renderElements();
    })
  }
}

function commentOnComment() {
  const commentOnComment = document.querySelectorAll('.comment');
  for (let comment of commentOnComment) {
    comment.addEventListener('click', () => {
      let index = comment.dataset.index
      let object = comments[index];
      commentInputElement.value = `${object.text}  ${object.name}`
      renderElements();
    })
  }
}
const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const currentDate = new Date().toLocaleString().slice(0, -3);


function addComment() {
  buttonElement.addEventListener('click', () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElement.value === '' || commentInputElement.value === '') {
      nameInputElement.classList.add("error");
      commentInputElement.classList.add("error");
      return;
    }
    const nameInComment = nameElement.value
    const textInComment = textElement.value
    showLoadingIndicatorComments();
    hideAddForm();
    fetch('https://wedev-api.sky.pro/api/v1/alexandr-trankov5/comments', {
        method: "POST",
        body: JSON.stringify({
          text: textInComment
            .replaceAll("<", "&lt")
            .replaceAll(">", "&gt")
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;"),
          name: nameInComment
            .replaceAll("<", "&lt")
            .replaceAll(">", "&gt")
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;"),
        })
      })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер упал, попробуй позже");
        } else if (response.status === 400) {
          throw new Error("Введите данные заново");
        } else {
          return response.json();
        };
      })
      .then(() => {
        deleteLoadingIndicatorComments();
        showAddForm();
        nameElement.value = "";
        textElement.value = "";
        getFetch();
        deleteLoadingIndicator();
      })
      .catch((error) => {
        showAddForm();
        deleteLoadingIndicatorComments();
        buttonElement.disabled = false;
        alert(error.message);
      });
  });
}

function deleteComment() {
  const buttonDelete = document.querySelectorAll('.delete-button');
  for (let button of buttonDelete) {
    button.addEventListener('click', (event) => {
      let index = button.dataset.index
      comments.splice(index, 1);
      event.stopPropagation();
      renderElements();
    })
  }
};