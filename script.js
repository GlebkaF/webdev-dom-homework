const comments = [];

const addFormButton = document.querySelector(".add-form-button");
const buttonDelete = document.querySelector(".add-form-buttondelete");
const commentsList = document.querySelector(".comments");
const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const form = document.querySelector(".add-form");

let valueInputName = "";
let valueInputText = "";

// Блокирует кнопку
function disabledBtn() {
  addFormButton.disabled = true;
  addFormButton.classList.add("grey");
}

disabledBtn();

// Чистит форму
function clearForm() {
  nameInput.value = "";
  commentInput.value = "";
  valueInputName = "";
  valueInputText = "";
}

// Валидирует форму
function validationForm() {
  if (valueInputName !== "" && valueInputText !== "") {
    addFormButton.disabled = false;
    addFormButton.classList.remove("grey");
  } else {
    disabledBtn();
  }
}

// Получает текущую дату и время
function getCurrentDate() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  return formattedDate;
}

// Обновляет счетчик лайков в разметке
function updateLikesCounter(commentId, likes) {
  const likesCounter = document.getElementById(`likesCounter-${commentId}`);
  likesCounter.textContent = likes;
}

// Добавляет новый комментарий
function addComment() {
  const newComment = {
    id: Date.now(),
    name: valueInputName,
    text: valueInputText,
    likes: 0,
    liked: false,
  };

  comments.push(newComment);

  const commentElement = document.createElement("li");
  commentElement.classList.add("comment");
  commentElement.innerHTML = `
    <div class="comment-header">
      <div>${newComment.name}</div>
      <div>${getCurrentDate()}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${newComment.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter" id="likesCounter-${newComment.id}">${newComment.likes}</span>
        <button class="like-button" id="likeButton-${newComment.id}" data-post-index="${newComment.id}"></button>
      </div>
    </div>`;

  commentsList.appendChild(commentElement);
  clearForm();
  disabledBtn();

  initEventListeners(newComment.id);
}

// Удаляет последний комментарий
function deleteComment() {
  comments.pop();
  commentsList.lastChild.remove();
}

// Обработка клика по Enter
function handleEnterKey(e) {
  if (e.key === "Enter") {
    addComment();
  }
}

// Слушатели
addFormButton.addEventListener("click", addComment);
form.addEventListener("keyup", handleEnterKey);
buttonDelete.addEventListener("click", deleteComment);
nameInput.addEventListener("input", (e) => {
  valueInputName = e.target.value;
  validationForm();
});
commentInput.addEventListener("input", (e) => {
  valueInputText = e.target.value;
  validationForm();
});

// Инициализация слушателей лайков
function initEventListeners(commentId) {
  const likeButtonElement = document.getElementById(`likeButton-${commentId}`);
  const comment = comments.find((comment) => comment.id === commentId);

  likeButtonElement.addEventListener("click", () => {
    if (comment.liked) {
      comment.liked = false;
      comment.likes--;
    } else {
      comment.liked = true;
      comment.likes++;
    }
    updateLikesCounter(commentId, comment.likes);
    renderComments();
    likeButtonElement.classList.toggle('-active-like');
  });
}

// Рендерит список комментариев
function renderComments() {
  commentsList.innerHTML = "";

  comments.forEach((comment) => {
    const commentElement = document.createElement("li");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${getCurrentDate()}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter" id="likesCounter-${comment.id}">${comment.likes}</span>
          <button class="like-button" id="likeButton-${comment.id}" data-post-index="${comment.id}"></button>
        </div>
      </div>`;

    commentsList.appendChild(commentElement);
    initEventListeners(comment.id);
  });
}

renderComments();