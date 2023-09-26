import { fetchComments, postComment, deleteComment } from './API.js';
import { getFormattedDate } from './logicDate.js';

const nameInput = document.getElementById("name-input");
const commentInput = document.getElementById("comment-input");
const commentsList = document.getElementById("comments-list");
const addCommentButton = document.getElementById("add-comment-button");

export function displayComments(comments) {
  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  comments.forEach((comment) => {
    const { author, date, text, likes } = comment;
    const formattedDate = new Date(date).toLocaleString();

    const commentHtml = `
    <li class="comment">
      <div class="comment-header">
        <div>${author.name}</div>
        <div>${formattedDate}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${text}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${likes}</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>
  `;


    commentsList.innerHTML += commentHtml;
  });
}


let isAddingComment = false;
let pendingName = "";
let pendingComment = "";


export async function addComment() {
  if (isAddingComment) {
    return;
  }
  function sanitizeInput(input) {
    return input.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }

  const name = sanitizeInput(nameInput.value);
  const comment = sanitizeInput(commentInput.value);

  if (name.length < 3 || comment.length < 3) {
    alert("Имя и комментарий должны быть не короче 3 символов");
    return;
  }

  nameInput.classList.remove("error");
  commentInput.classList.remove("error");
  
  getFormattedDate();
  const formattedDate = getFormattedDate();

  const newComment = {
    name: name,
    author: { name: name },
    text: comment,
    date: formattedDate,
    likes: 0,
    isLiked: false,
  };

  isAddingComment = true;
  commentsList.textContent = "Добавляю...";
  addCommentButton.textContent = "Добавляю...";
  nameInput.value = "Добавляю...";
  commentInput.value = "Добавляю...";
  nameInput.disabled = true;
  commentInput.disabled = true;
  
  try {
    const responseData = await postComment(newComment);
    console.log("New comment added:", responseData);
    fetchComments();
    nameInput.value = "";
    commentInput.value = "";
  } catch (error) {
    alert(error.message);
    pendingName = name;
    pendingComment = comment;

  } finally {
  isAddingComment = false;

  if (pendingName !== "") {
    nameInput.value = pendingName;
  }
  if (pendingComment !== "") {
    commentInput.value = pendingComment;
  }

  addCommentButton.textContent = "Написать";
  nameInput.disabled = false;
  commentInput.disabled = false;

  commentsList.textContent = "";

  pendingName = "";
  pendingComment = "";
}
}

export async function handleLikeButtonClick(button) {
  if (button && button.parentElement) {
    const likesCounter = button.parentElement.querySelector(".likes-counter");
    const currentLikes = parseInt(likesCounter.textContent, 10);

    if (button.classList.contains("active")) {
      button.classList.remove("active", "loading-like");
      likesCounter.textContent = currentLikes - 1;
    } else {
      button.classList.add("active", "loading-like");
      likesCounter.textContent = currentLikes + 1;
    }

    setTimeout(() => {
      button.classList.remove("loading-like");
    }, 2000);
  }
}

commentsList.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("like-button")) {
    event.stopPropagation();
    handleLikeButtonClick(target);
  }
});


export async function deleteLastComment() {
  const lastComment = commentsList.lastElementChild;
  if (lastComment) {
    const commentId = lastComment.getAttribute("data-comment-id");

    try {
      await deleteComment(commentId);
      commentsList.removeChild(lastComment);
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Ошибка при удалении комментария");
    }
  } else {
    alert("Нет комментариев для удаления");
  }
}




