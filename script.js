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
  return `${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
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
  renderComments()
  clearForm()
  disabledBtn()
}

// Инициализация слушателей лайков
function initEventListeners(e) {
    let id = Number(e.target.id)
    let s = comments.filter((item) => item.id === id ? {...item, liked: true, likes: item.likes++} : item)


      console.log(id,s, comments)
    // updateLikesCounter(commentId, comment.likes);
}

// Рендерит список комментариев
function renderComments() {
  commentsList.innerHTML = "";

  comments.forEach((comment) => {
    commentsList.innerHTML += `
    <li class ='comment'>
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${getCurrentDate()}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${comment.text}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter" id="${comment.id}">${comment.likes}</span>
          <button class="like-button" id="${comment.id}" data-post-index="${comment.id}"></button>
        </div>
      </div>
      </li>`;

    // initEventListeners(comment.id);
  });
  document.querySelectorAll('.like-button').forEach((btn) => btn.addEventListener('click', initEventListeners))
}

// Удаляет последний комментарий
function deleteComment() {
  comments.pop();
  renderComments();
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





