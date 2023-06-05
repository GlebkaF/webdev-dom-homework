"use strict";
import { getAPI, postApi, deleteComment, toggleLike, commentCorrection, loginUser } from "./api.js";
import renderMain from "./render.js";
import { renderLoginComponent } from "./components/login-component.js";

let user = "";
let token = "";
let messages = [];

let appElement = document.getElementById("app");

const updateUser = () => {
  if (localStorage.user === undefined) {
    return
  }
  else {
    user = JSON.parse(localStorage.user);
    token = `Bearer ${user.token}`;
  };
};

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

const renderMainList = (messages) => {
  renderMain(messages, appElement, token, user);
  if (token) {
    const nameInputElement = document.getElementById("name-input");
    nameInputElement.value = user.name;
    nameInputElement.setAttribute('disabled', '');
    const commentInputElement = document.getElementById("comment-input");
    initLikeButtonsListeners();
    initCorrectButtonsListeners();
    initAnswersListeners(commentInputElement);
    initDeleteButton(getCommentDataMain);
    initInputs(commentInputElement);
    document.getElementById('exit').addEventListener('click', () => {
      localStorage.clear();
      user = "";
      token = "";
      fetchAndRenderMessages();
    });
  }
  else {
    document.getElementById('login-link').addEventListener('click', () => {
      renderLoginComponent(appElement, fetchAndRenderMessages);
    });
  };
};

const fetchAndRenderMessages = () => {
  updateUser();
  return getAPI(token, getCommentDataMain).then((result) => {
    messages = result;
    renderMainList(messages, token, user);
  })
};
fetchAndRenderMessages();

const initLikeButtonsListeners = () => {
  const likeButtonsElements = document.querySelectorAll(".like-button");
  for (const likeButtonElement of likeButtonsElements) {
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      likeButtonElement.classList.add('-loading-like');
      const id = likeButtonElement.dataset.id;
      toggleLike({
        id,
        token,
      }).then(() => {
        fetchAndRenderMessages();
      })
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
        const id = correctButtonElement.dataset.id;
        let body = {
          text: document.querySelector('.comment-correction').value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
        }
        commentCorrection(body, token, id)
          .then((responseData) => {
            fetchAndRenderMessages();
            // const index = correctButtonElement.dataset.index;
            // if (messages[index].isEdit) {
            //   const correctionText = document.querySelector('.comment-correction')
            //   messages[index].comment = correctionText.value
            //     .replaceAll("&", "&amp;")
            //     .replaceAll("<", "&lt;")
            //     .replaceAll(">", "&gt;")
            //     .replaceAll('"', "&quot;");
            //   messages[index].isEdit = !messages[index].isEdit;
          })
      }
      else {
        messages[index].isEdit = !messages[index].isEdit;
        renderMainList();
      };
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
    });
  };
};

function addComments(elem2) {
  if (elem2.value.trim() === "") {
    elem2.classList.add("input-error");
    return;
  }
  fetchPost(elem2);
};
const fetchPost = (elem2) => {
  const addFormElement = document.getElementById("addForm");
  const loadingElement = document.querySelector(".loading");
  addFormElement.style.display = 'none';
  loadingElement.style.display = 'block';
  let postBody = {
    name: user.name,
    // userId:user.id,
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
      return;
    };
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
  const addFormElement = document.getElementById("addForm");
  const loadingElement = document.querySelector(".loading");
  const deleteButtons = document.querySelectorAll(".delete");
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      addFormElement.style.display = 'none';
      loadingElement.style.display = 'block';
      const id = deleteButton.dataset.id;
      deleteComment({
        id,
        token,
      }).then((responseData) => {
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
