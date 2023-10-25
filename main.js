import { enableButton } from "./enableButton.js";
import { fetchComments } from "./fetchComments.js";
import { clickButton } from "./buttonElement.js";
// import { addLikes } from "./addLikes.js";
// import { addQuote } from "./addQuote.js";
// import { getComments, postComment } from "./api.js";
// import { currentDate } from "./currentDate.js";
// import { renderComments } from "./renderComments.js";
// import { sanitizeHtml } from "./sanitizeHtml.js";

const buttonElement = document.getElementById("add-button");
// const nameInputElement = document.getElementById("name-input");
// const commentInputElement = document.getElementById("comment-input");
// const commentListElement = document.getElementById("comment-list");
// const commentsElements = document.querySelectorAll(".comments");
// const likeButtons = document.querySelectorAll(".like-button");
// const likeCounts = document.querySelectorAll(".likes-counter");
// const addForm = document.querySelectorAll(".add-form");
// const loadingComment = document.querySelector(".loading-comment");

enableButton({ buttonElement });

fetchComments();

clickButton();

console.log('It works!');