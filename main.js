"use strict";
// Код писать здесь
let user = "";
let messages = [];
let appElement = document.getElementById("app")
let token = "";
import { getAPI, postApi, deleteComment } from "./api.js";
import renderMain from "./render.js";
import { renderLoginComponent } from "./components/login-component.js";

const getCommentDataMain = (comment) => {
  return {
    userId: comment.author.id,
    login: comment.author.login,
    name: comment.author.name,
    time: getCurrentDate(new Date(comment.date)),
    comment: comment.text,
    commentID: comment.id,
    likesCount: comment.likes,
    liked: comment.isLiked,
    isEdit: false,
    isLoading: false,
  };
};
const renderMainList = () => {
  renderMain(messages, getCommentListMain, appElement, token);
  if (token) {
    const nameInputElement = document.getElementById("name-input");
    nameInputElement.value = user.name;
    console.log(user);
    console.log(messages);
    const commentInputElement = document.getElementById("comment-input");
    initLikeButtonsListeners();
    initCorrectButtonsListeners();
    initAnswersListeners(commentInputElement);
    initDeleteButton(getCommentDataMain);
    initInputs(nameInputElement, commentInputElement);
  }
  else {
    document.getElementById('login-link').addEventListener('click', () => {
      renderLoginComponent(appElement,
        { setToken: (newToken) => { token = newToken; } },
        { setUser: (newUser) => { user = newUser; } },
        fetchAndRenderMessages);
    });
  };
};

const fetchAndRenderMessages = () => {
  return getAPI(token, getCommentDataMain).then((result) => {
    messages = result;
    // console.log(messages);
    renderMainList(messages);
  })
};
fetchAndRenderMessages();

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};
const initLikeButtonsListeners = () => {
  const likeButtonsElements = document.querySelectorAll(".like-button");
  for (const likeButtonElement of likeButtonsElements) {
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      likeButtonElement.classList.add('-loading-like');
      const index = likeButtonElement.dataset.index;
      messages[index].liked = !messages[index].liked;
      if (messages[index].liked) {
        messages[index].likesCount += 1;
      }
      else {
        messages[index].likesCount -= 1;
      }
      delay(2000).then(renderMainList);
    })
  };
};

const initCorrectButtonsListeners = () => {
  const correctButtonsElements = document.querySelectorAll(".correct-button");
  const correctedComments = document.querySelectorAll('.comment-correction');
  for (const correctedComment of correctedComments) {
    correctedComment.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  };
  for (const correctButtonElement of correctButtonsElements) {
    correctButtonElement.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = correctButtonElement.dataset.index;
      if (messages[index].isEdit) {
        const correctionText = document.querySelector('.comment-correction')
        messages[index].comment = correctionText.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
        messages[index].isEdit = !messages[index].isEdit;
      }
      else {
        messages[index].isEdit = !messages[index].isEdit;
      };
      renderMainList();
    });
  };
};
const initAnswersListeners = (element) => {
  const answersElements = document.querySelectorAll(".comment");
  for (const answerElement of answersElements) {
    answerElement.addEventListener("click", () => {
      const index = answerElement.dataset.index;
      const quote = answerElement.querySelector(".comment-text");
      element.value = `QUOTE_BEGIN ${messages[index].name}: \n ${quote.innerText}, QUOTE_END \n`;
      // renderMainList();
    });
  };
};

function getCommentListMain(message, index) {
  let like = (message.liked) ? 'like-button -active-like' : 'like-button';
  let edit = (message.isEdit) ? `<textarea type="textarea" class="comment-correction"rows="4">${message.comment}</textarea>` : `<div class="comment-text">${message.comment.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>").replaceAll("\n", "<br>")}</div>`;
  let correctBtn = (message.isEdit) ? `<button data-index="${index}" class="correct-button save-button">Сохранить</button>` : `<button data-index="${index}" class="correct-button">Редактировать</button>`;
  return `<li class="comment" data-index="${index}">
  <div class="comment-header" >
    <div>${message.name}</div>
    <div>${message.time}</div>
  </div>
  <div class="comment-body">
    ${edit}
  </div>
  <div class="comment-footer">
    ${correctBtn}
    <button data-id="${message.commentID}" class="delete">Удалить</button>
    <div class="likes">
      <span class="likes-counter">${message.likesCount}</span>
      <button data-index="${index}" class="${like}"></button>
    </div>
  </div>
</li>`;
};

function addComments(elem1, elem2) {
  if (elem1.value.trim() === "") {
    elem1.classList.add("input-error");
    return;
  }
  if (elem2.value.trim() === "") {
    elem2.classList.add("input-error");
    return;
  }
  fetchPost(elem1, elem2);
};
const fetchPost = (elem1, elem2) => {
  const addFormElement = document.getElementById("addForm");
  const loadingElement = document.querySelector(".loading");
  addFormElement.style.display = 'none';
  loadingElement.style.display = 'block';
  let postBody = {
    name: elem1.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    date: new Date(),
    isLiked: false,
    likes: 0,
    text: elem2.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    forceError: false,
  };
  const getAPIResponse = (response) => {
    if (response.result === "ok") {
      fetchAndRenderMessages();
    }
    else {
      return
    ;}
  };
  postApi(postBody, getAPIResponse, token);
};
const initInputs = (elem1, elem2) => {
  const buttonElement = document.getElementById("write-button");
  buttonElement.addEventListener("click", (event) => {
    event.stopPropagation();
    addComments(elem1, elem2);
  });
  const inputElements = document.querySelectorAll(".add-form");
  for (const inputElement of inputElements) {
    inputElement.addEventListener('input', (event) => {
      event.stopPropagation();
      buttonElement.removeAttribute('disabled', '');
      inputElement.classList.remove("input-error");
    }
    );
    inputElement.addEventListener('keyup', (event) => {
      event.stopPropagation();
      if (event.code === 'Enter') {
        addComments(elem1, elem2);
      };
    });
  };
};

const initDeleteButton = () => {
  const deleteButtons = document.querySelectorAll(".delete");
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = deleteButton.dataset.id;
      deleteComment({
        id,
        token,
      }).then((responseData) => {
        console.log(responseData);
        // responseData.comments.map((item) => callback(item))
        // messages = responseData.todos;
        // renderMainList(messages);
        fetchAndRenderMessages();
      });
    });
  };
};


function getCurrentDate(date) {
  let day = date.getDate();
  if (day < 10) day = "0" + day;
  let month = date.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let hour = date.getHours();
  if (hour < 10) hour = "0" + hour;
  let minute = date.getMinutes();
  if (minute < 10) minute = "0" + minute;
  return day + '.' + month + '.' + date.getFullYear() % 100 + ' ' + hour + ':' + minute;
};
