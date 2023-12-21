let addFormButton = document.querySelector(".add-form-button");
let addFormButtondelete = document.querySelector(".add-form-buttondelete");
let commentsList = document.querySelector(".comments");

function addComment() {
  const nameInput = document.querySelector(".add-form-name");
  const commentInput = document.querySelector(".add-form-text");
  const name = nameInput.value;
  const comment = commentInput.value;

  // Validation check
  if (name.trim() === "" || comment.trim() === "") {
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

addFormButton.addEventListener("click", addComment);

const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");

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

addFormButtondelete.addEventListener("click", () => {
  const lastComment = commentsList.lastChild;
  commentsList.removeChild(lastComment);
});