"use strict";

import { loadComments, postComment } from "./api.js";
import { renderComments } from "./render.js";

const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const deleteButtonElement = document.getElementById("delete-button");
const listLoaderElement = document.querySelector(".list-loader");
const inputLoaderElement = document.querySelector(".input-loader");
const formElement = document.querySelector(".comment-form");

let comments = [];

inputLoaderElement.style.display = "none";

function getComments() {
  return loadComments()
  .then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: normalDate(new Date(comment.date)),
        text: comment.text,
        likes: comment.likes,
        favorite: false,
      };
    });
    comments = appComments;
    listLoaderElement.style.display = "none";
    renderComments(comments);
  });
}

getComments();

function checkForm() {
  if (textInputElement.value !== "" && nameInputElement.value !== "") {
    buttonElement.removeAttribute("disabled");
  } else {
    buttonElement.setAttribute("disabled", true);
  }
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

function onCommentSubmit() {
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  }

  if (textInputElement.value === "") {
    textInputElement.classList.add("error");
    return;
  }

  formElement.style.display = "none";
  inputLoaderElement.style.display = "block";

  const payload = {
    name: nameInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
    text: textInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
  };

  postComment(payload.text, payload.name)
    .then(() => {
      getComments()
      inputLoaderElement.style.display = "none";
      formElement.style.display = "flex";
      nameInputElement.value = "";
      textInputElement.value = "";
    })
    .catch((error) => {
      inputLoaderElement.style.display = "none";
      formElement.style.display = "flex";      
      console.log(error.message);
      if (error.message === 'Сервер сломался, попробуй позже' || error.message === 'Имя и комментарий должны быть не короче 3 символов') {
        alert(`${error.message}`);            
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже"); 
      }
    });   
}

nameInputElement.addEventListener("input", () => {
  nameInputElement.classList.remove("error");
  checkForm();
});

textInputElement.addEventListener("input", () => {
  textInputElement.classList.remove("error");
  checkForm();
});

buttonElement.addEventListener("click", onCommentSubmit);

document.addEventListener("keyup", (event) => {
  if (event.code === 'Enter') {
    onCommentSubmit();
  }
})

deleteButtonElement.addEventListener('click', () => {
  comments.pop();
  renderComments(comments);
})
