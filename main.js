//main.js
//"use strict";

import { getTodos, postTodo } from "./api.js";

  const addFormNameElement = document.getElementById("add-form-name");
  const buttonElement = document.getElementById("add-form-button");
  const addFormTextElement = document.getElementById("add-form-text");
  const listElement = document.getElementById("comments");
  const loadingMessage = document.getElementById("loading-message");
  const addFormElement = document.getElementById("add-form");
  const addingCommentElement = document.getElementById("adding-comment");

  let comments = [];

  const plusZero = (str) => {
    return str < 10 ? `0${str}` : str;
  };

  const now = () => {
    const currentDate = new Date();
    let date = plusZero(currentDate.getDate());
    let month = plusZero(currentDate.getMonth() + 1);
    let hours = plusZero(currentDate.getHours());
    let mins = plusZero(currentDate.getMinutes());
    return `${date}.${month}.${currentDate.getFullYear() % 100} ${hours}:${mins}`;
  };

  const fetchComments = () => {
    loadingMessage.style.display = "block"; 
    getTodos().then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: now(new Date(comment.date)),
            text: comment.text,
            likes: 0,
            liked: false,
          };
        });

        comments = appComments;
        renderComments();
        buttonElement.disabled = false;
        buttonElement.formContent = "Написать";
        loadingMessage.style.display = "none";
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        loadingMessage.style.display = "none";
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      });
  };

  const initEventListeners = () => {
    const likesButton = document.querySelectorAll(".like-button");
    for (const likeButton of likesButton) {
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = parseInt(likeButton.getAttribute("data-index"));
        const comment = comments[index];
        comment.liked = !comment.liked;
        if (comment.liked) {
          comment.likes++;
        } else {
          comment.likes--;
        }
        renderComments();
      });
    }
  };

  const renderComments = () => {
    const commentsHTML = comments
      .map((comment, index) => {
        return `<li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${comment.liked ? '-active-like' : ''}"></button>
            </div>
          </div>
        </li>`;
      })
      .join("");
    listElement.innerHTML = commentsHTML;
    initEventListeners();
  };

  buttonElement.addEventListener("click", () => {
    addFormNameElement.classList.remove("error");
    if (addFormNameElement.value.length < 3) {
      addFormNameElement.classList.add("error");
      alert("Имя и комментарий должны быть не короче 3 символов");
      return;
    }
    addFormTextElement.classList.remove("error");
    if (addFormTextElement.value.length < 3) {
      addFormTextElement.classList.add("error");
      alert("Имя и комментарий должны быть не короче 3 символов");
      return;
    }

    renderComments();
    buttonElement.disabled = true;
    buttonElement.formContent = "Элемент добавляется ...";

    addFormElement.style.display = "none";
    addingCommentElement.style.display = "block";

    postTodo({
        name: addFormNameElement.value,
        text: addFormTextElement.value,
    }).then(() => {
        return fetchComments();
      })
      .then(() => {
        buttonElement.disabled = false;
        buttonElement.formContent = "Написать";
        addFormNameElement.value = "";
        addFormTextElement.value = "";

        addFormElement.style.display = "block";
        addingCommentElement.style.display = "none";
      })
      .catch((error) => {
        console.error("Error adding a new comment:", error);
        alert(error.message);
      });
  });

  fetchComments();

  console.log("It works!");