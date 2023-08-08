//"use strict";
import { getFetch } from "./api.js";
import { postFetch } from "./api.js";
import { postFetchFirst } from "./api.js";
import { renderLoader } from "./secondaryforms.js";
import { commentReplyNew } from "./secondaryforms.js";
import { startLoader } from "./secondaryforms.js";
import { renderComments } from "./comment.js";
import { renderAddComment } from "./comment.js";
import { addComment } from "./comment.js";
import { delCommentFetch } from "./comment.js";
export let comments = []; // создание массива для комментариев

const commentForm = document.getElementById(`add-formListId`);
const listButton = document.getElementById(`add-form-buttonListId`);
const commentText = document.getElementById(`commentText`);
let currentDate = new Date();

// Загрузка комментариев по API сервера в массив
export function dataGet() {
  getFetch()
    .then((response) => {
      const jsonPromise = response.json();
      return jsonPromise;
    })
    .then((responseData) => {
      comments = responseData.comments;
      renderComments(comments, commentText);
      startLoader();
      delCommentFetch(comments);
      console.log(responseData);
    })
    .catch((error) => {
      alert(`${error}`);
    });
}
dataGet();

//создание блоков комментариев по содержимому массива - comments.js
renderComments(comments, commentText);

// Ввод с клавиатуры
// function keyPush() {
//   commentForm.addEventListener(`keyup`, (event) => {
//     if (event.code === "Enter") {
//       postFetch()

//       console.log(`сохранить комментарий`);
//     }
//   });
// }
// keyPush()

addComment(comments, commentText); //вызываем функцию, проводит добавление по клику "написать" комментария в массив самый первый раз после обновления страницы
commentReplyNew(comments, commentText);
//fetch1
export function fetchFunction() {
  const addFormButtonIdNew = document.getElementById(
    `add-form-buttonListIdNew`
  );
  postFetch()
    .then((response) => {
      if (response.status === 400) {
        alert(`Нужно ввести более 2 символов!`);
        //addFormButtonIdNew.disabled=false;
        addFormButtonIdNew.disabled = false;
        throw new Error(`Нужно ввести более 2 символов!!!`);
      } else if (response.status === 500) {
        fetchFunction();
        throw new Error(`Сервер опять не отвечает...`);
      } else {
        renderLoader();
        return response.json();
      }
    })
    .then((responseData) => {
      return getFetch();
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      comments = responseData.comments;
      console.log(comments);
      renderAddComment(comments, commentText);
      renderComments(comments, commentText);
      commentReplyNew(comments, commentText);
    })
    .catch((error) => {
      //alert(`${error}`)
    });
}
//fetch2
export function firstLaunchFetchFunction() {
  postFetchFirst()
    .then((response) => {
      if (response.status === 400) {
        listButton.disabled = false;
        alert(`Нужно ввести более 2 символов`);
        throw new Error(`Нужно ввести более 2 символов`);
      } else if (response.status === 500) {
        firstLaunchFetchFunction();
        throw new Error(`Сервер опять не отвечает...`);
      } else {
        renderLoader();
        return response.json();
      }
    })
    .then((responseData) => {
      return getFetch();
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      comments = responseData.comments;
      console.log(comments);
      renderAddComment(comments, commentText);
      renderComments(comments, commentText);
      commentReplyNew(comments, commentText);
    })
    .catch((error) => {
      //alert(`${error}`)
    });
}
// Код писать здесь
console.log("It works!");
