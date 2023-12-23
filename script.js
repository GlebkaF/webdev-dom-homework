let addFormButton = document.querySelector(".add-form-button");
let addFormButtondelete = document.querySelector(".add-form-buttondelete");
let commentsList = document.querySelector(".comments");
const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
//добавляю текст и если ничего нет мне пишут напиши поле ввода и кнопка становиться серой
function addComment() {
  const name = nameInput.value;
  const comment = commentInput.value;
  // Validation check
  if (name === "" || comment === "") {
    alert("Пожалуста введите поля ввода");
    addFormButton.classList.toggle("grey");
    return;
  }
  // Create new comment
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  const newComment = document.createElement("li");
  newComment.classList.add("comment");
  newComment.innerHTML = `
    <div class="comment-header">
      <div>${name}</div>
      <div>${formattedDate}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>`;
  commentsList.appendChild(newComment);
  // Reset input values
  nameInput.value = "";
  commentInput.value = "";
}
//текст добавляеться при нажатии кнопки Enter
addFormButton.addEventListener("click", addComment);
nameInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addComment();
  }
});
commentInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addComment();
  }
});
// удаление последнего элемента списка
addFormButtondelete.addEventListener("click", () => {
  const lastComment = commentsList.lastChild;
  commentsList.removeChild(lastComment);
});