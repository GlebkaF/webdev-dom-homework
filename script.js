let comments = [];

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
  if (valueInputName.trim() !== "" && valueInputText.trim() !== "") {
    addFormButton.disabled = false;
    addFormButton.classList.remove("grey");
  } else {
    disabledBtn();
  }
}

// Получает текущую дату и время
function getCurrentDate() {
  const currentDate = new Date();
  return `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
}



// Добавляет новый комментарий
function addComment() {
  if (valueInputName.trim() !== "" && valueInputText.trim() !== "") {
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
  return
}

// Инициализация слушателей лайков
function likesComment(e) {
    let id = Number(e.target.id)
    console.log(comments, id)
    comments = comments.map((comment)=>{
      if (comment.id === id && comment.liked === false) {
        return {...comment, liked: !comment.liked, likes: 1}
      } else if((comment.id === id && comment.liked === true)) {
        return {...comment, liked: !comment.liked, likes: 0}
      } else {
        return comment
      }
    })
    renderComments()
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
          <button class=${comment.liked ? 'like-button_like-button-red' : 'like-button'} id="${comment.id}" data-post-index="likeBtn"></button>
        </div>
      </div>
      </li>`;

    // initEventListeners(comment.id);
  });
  document.querySelectorAll('[data-post-index="likeBtn"]').forEach((btn) => btn.addEventListener('click', likesComment))
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




 
