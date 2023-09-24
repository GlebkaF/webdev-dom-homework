let isAddingComment = false;
let pendingName = "";
let pendingComment = "";

export async function  addComment() {
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

  isAddingComment = true;
  commentsList.textContent = "Добавляю...";
  addCommentButton.textContent = "Добавляю...";
  nameInput.value = "Добавляю...";
  commentInput.value = "Добавляю...";
  nameInput.disabled = true;
  commentInput.disabled = true;

  try {
    const response = await fetch("https://wedev-api.sky.pro/api/v1/atamyrat-isayev/comments", {
      method: "POST",
      body: JSON.stringify(newComment),
    });

    if (response.status === 400) {
      alert("Имя и комментарий должны быть не короче 3 символов");
      pendingName = name;
      pendingComment = comment;
    } else if (response.status === 500) {
      alert("Сервер сломался, попробуйте позже");
      pendingName = name;
      pendingComment = comment;
    } else {
      const responseData = await response.json();
      console.log("New comment added:", responseData);
      fetchComments();
      nameInput.value = "";
      commentInput.value = "";
    }
  } catch (error) {
    alert("Кажется, у вас сломался интернет, попробуйте позже");
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

    pendingName = "";
    pendingComment = "";
  }
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

commentsList.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("like-button")) {
    event.stopPropagation();
    handleLikeButtonClick(target);
  }
});
const commentId = lastComment.getAttribute("data-comment-id");

export async function deleteComment(commentId) {
    deleteCommentButton.addEventListener("click", () => {
    deleteCommentButton.textContent = "Удаляю...";
    const lastComment = commentsList.lastElementChild;
    if (lastComment) {
      

      fetch(`https://wedev-api.sky.pro/api/v1/atamyrat-isayev/comments/${commentId}`, {
        method: "DELETE",
      })
        .then(() => {
          commentsList.removeChild(lastComment);
          deleteCommentButton.textContent = "Удалить последний комментарий";
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
          alert("Ошибка при удалении комментария");
          deleteCommentButton.textContent = "Удалить последний комментарий";
        });
    } else {
      alert("Нет комментариев для удаления");
      deleteCommentButton.textContent = "Удалить последний комментарий";
    }
  });
}

export async function displayComments(comments) {
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
