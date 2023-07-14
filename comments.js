// comments.js
import { getCommentsFromAPI, addCommentViaAPI } from './api.js';

let commentInput; 

export function setCommentInput(inputElement) {
  commentInput = inputElement;
}

export function renderComments(commentsData) {
  const commentsList = document.querySelector(".comments");
  commentsList.innerHTML = "";

  commentsData.forEach((comment, index) => {
    const newComment = document.createElement("li");
    newComment.classList.add("comment");

    const likeButtonClass = comment.isLiked
      ? "like-button active-like"
      : "like-button";
    const commentTemplate = `
      <div class="comment-header">
        <div>${comment.author.name}</div>
        <div>${getCurrentDateTime(comment.date)}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${comment.text}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="${likeButtonClass}" data-index="${index}"></button>
        </div>
      </div>
    `;
    newComment.innerHTML = commentTemplate;

    // Текст без применения HTML-тегов
    const commentAuthor = newComment.querySelector(".comment-header div:first-child");
    const commentText = newComment.querySelector(".comment-text");
    commentAuthor.textContent = comment.author.name;
    commentText.textContent = comment.text;

    commentsList.appendChild(newComment);
  });

  addReplyHandlers(commentsData);
}

export function handleLike(event, commentsData) {
  const index = event.target.dataset.index;
  const comment = commentsData[index];

  if (comment.isLiked) {
    comment.likes--;
    comment.isLiked = false;
  } else {
    comment.likes++;
    comment.isLiked = true;
  }
  renderComments(commentsData);
}

export function handleReply(index, commentsData) {
  const comment = commentsData[index];
  const replyText = `>${comment.text}\n@${comment.author.name}, `;
  commentInput.value = replyText;
  commentInput.focus();
}

export function addReplyHandlers(commentsData) {
  const commentElements = document.querySelectorAll(".comment");

  commentElements.forEach((element, index) => {
    const likeButton = element.querySelector(".like-button");
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      handleLike(event, commentsData);
    });
    element.addEventListener("click", (event) => {
      const isLikeButton = event.target.classList.contains("like-button");
      if (!isLikeButton) {
        handleReply(index, commentsData);
      }
    });
  });
}

export function deleteLastComment(commentsData) {
  commentsData.pop();
  renderComments(commentsData);
}

export function getCurrentDateTime(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addCommentViaAPIWrapper(commentsData);
  }
}

export async function renderCommentsFromAPI(commentsData) {
  try {
    const commentsList = document.querySelector(".comments");
    commentsList.innerHTML = "Загрузка комментариев...";

    const data = await getCommentsFromAPI();
    commentsData.push(...data);
    renderComments(commentsData);
  } catch (error) {
    console.error(error);
    alert(error.message);
    const commentsList = document.querySelector(".comments");
    commentsList.innerHTML = "Ошибка при загрузке комментариев. Проверьте интернет-соединение.";
  }
}

export async function addCommentViaAPIWrapper(commentsData, nameInputValue, commentInputValue) {
    const author = nameInputValue.trim();
    const text = commentInputValue.trim();
  
    if (!author) {
      alert("Пожалуйста, укажите ваше имя.");
      return;
    }
    if (!text) {
      alert("Пожалуйста, напишите комментарий.");
      return;
    }
  
    try {
      const newComment = {
        text,
        name: author,
      };
  
      // Проверка наличия интернет-соединения
      const isOnline = navigator.onLine;
      if (!isOnline) {
        throw new Error("Кажется, у вас сломался интернет, попробуйте позже");
      }
  
      await addCommentViaAPI(newComment);
      commentInput.value = "";
      nameInputValue = "";
      commentInputValue = "";
      await renderCommentsFromAPI(commentsData);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }