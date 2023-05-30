"use strict";
// Код писать здесь
let messages = [];
const listElement = document.getElementById("list");
const addFormElement = document.getElementById("addForm");
const loadingElement = document.querySelector(".loading");
import { getAPI } from "./api.js";
import renderMessages from "./render.js";

const getCommentDataMain = (comment) => {
  return {
    name: comment.author.name,
    time: getCurrentDate(new Date(comment.date)),
    comment: comment.text,
    likesCount: comment.likes,
    liked: comment.isLiked,
    isEdit: false,
    isLoading: false
  };
};
const renderMainList = () => {
  renderMessages(messages, getCommentListMain, listElement);
  initLikeButtonsListeners();
  initCorrectButtonsListeners();
  initAnswersListeners();
}

const fetchAndRenderMessages = () => {
  getAPI(getCommentDataMain).then((result) => {
    messages = result;
    renderMainList();
  }).then(() => {
    const loadingTitleElement = document.querySelector(".loading-title");
    loadingTitleElement.style.display = 'none';
  });
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
const initAnswersListeners = () => {
  const answersElements = document.querySelectorAll(".comment");
  for (const answerElement of answersElements) {
    answerElement.addEventListener("click", () => {
      const index = answerElement.dataset.index;
      const quote = answerElement.querySelector(".comment-text");
      commentInputElement.value = `QUOTE_BEGIN ${messages[index].name}: \n ${quote.innerText}, QUOTE_END \n`;
      renderMainList();
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
    <div class="likes">
      <span class="likes-counter">${message.likesCount}</span>
      <button data-index="${index}" class="${like}"></button>
    </div>
  </div>
</li>`;
}

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const deleteButtonElement = document.getElementById("delete-button");
const buttonElement = document.getElementById("write-button");

buttonElement.addEventListener("click", (event) => {
  event.stopPropagation();
  addComments();
});
function addComments() {
  if (nameInputElement.value.trim() === "") {
    nameInputElement.classList.add("input-error");
    return;
  }
  if (commentInputElement.value.trim() === "") {
    commentInputElement.classList.add("input-error");
    return;
  }
  fetchPost();
};
const fetchPost = () => {
  addFormElement.style.display = 'none';
  loadingElement.style.display = 'block';
  let postBody = {
    name: nameInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    date: new Date(),
    isLiked: false,
    likes: 0,
    text: commentInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    forceError: false,
  };
  const getAPIResponse = (response) => {
    new Promise(() => {
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      }
      if (response.status === 400) {
        throw new Error("Плохой запрос");
      }
      fetchAndRenderMessages();
      loadingElement.style.display = 'none';
      addFormElement.style.display = "flex";
      deleteButtonElement.classList.add('delete-active');
      buttonElement.setAttribute('disabled', '');
      nameInputElement.value = "";
      commentInputElement.value = "";
    })
      .catch((error) => {
        loadingElement.style.display = 'none';
        addFormElement.style.display = "flex";
        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуйте позже");
          fetchPost();
          return;
        }
        if (error.message === "Плохой запрос") {
          alert("Имя и комментарий должны быть не короче трех символов");
          nameInputElement.classList.add("input-error");
          commentInputElement.classList.add("input-error");
          return;
        }
        alert('Кажется что-то пошло не так, возможно отсутствует подключение к интернету');
        console.warn(error);
      });
  };
  postApi(postBody, getAPIResponse);
};
import { postApi } from "./api.js";

const inputElements = document.querySelectorAll(".add-form");
for (const inputElement of inputElements) {
  inputElement.addEventListener('keyup', (event) => {
    event.stopPropagation();
    if (event.code === 'Enter') {
      addComments();
    };
  });
  inputElement.addEventListener('input', (event) => {
    event.stopPropagation();
    buttonElement.removeAttribute('disabled', '');
    nameInputElement.classList.remove("input-error");
    commentInputElement.classList.remove("input-error");
  }
  )
};

deleteButtonElement.addEventListener('click', () => {
  messages.pop();
  deleteButtonElement.classList.remove('delete-active');
  renderMainList();
});

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
}
