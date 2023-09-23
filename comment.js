import { fetchComments, deleteComment } from './api.js';
import { showError } from './ui.js';

export async function displayComments(comments) {
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = "";

    comments.forEach((comment) => {
        const { id, author, date, text, likes } = comment;
        const formattedDate = new Date(date).toLocaleString();

        const commentHtml = `
      <li class="comment" data-comment-id="${id}">
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

export async function addComment() {
    if (isAddingComment) {
        return;
    }

    const name = sanitizeInput(nameInput.value.trim());
    const comment = sanitizeInput(commentInput.value.trim());

    if (name.length < 3 || comment.length < 3) {
        alert("Имя и комментарий должны быть не короче 3 символов");
        return;
    }

    nameInput.classList.remove("error");
    commentInput.classList.remove("error");

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    const newComment = {
        name: name,
        author: { name: name },
        text: comment,
        date: formattedDate,
        likes: 0,
        isLiked: false,
    };
    commentsList.addEventListener("click", (event) => {
        const target = event.target;

        if (target.classList.contains("like-button")) {
            event.stopPropagation();
            handleLikeButtonClick(target);
        }
    });
}

export async function handleLikeButtonClick(button) {
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

