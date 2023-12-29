let comments = [];
const addFormButton = document.querySelector(".add-form-button");
const buttonDelete = document.querySelector(".add-form-buttondelete");
const commentsList = document.querySelector(".comments");
const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const form = document.querySelector(".add-form");
let valueInputName = "";
let valueInputText = "";

function disabledBtn() {
  addFormButton.disabled = true;
  addFormButton.classList.add("grey");
}

disabledBtn();

function clearForm() {
  nameInput.value = "";
  commentInput.value = "";
  valueInputName = "";
  valueInputText = "";
}

function validationForm() {
  if (valueInputName.trim() !== "" && valueInputText.trim() !== "") {
    addFormButton.disabled = false;
    addFormButton.classList.remove("grey");
  } else {
    disabledBtn();
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  return `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

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
    renderComments();
    clearForm();
    disabledBtn();
  }
}

function likesComment(e) {
  let id = parseInt(e.target.id);
  comments = comments.map((comment) => {
    if (comment.id === id && comment.liked === false) {
      return { ...comment, liked: !comment.liked, likes: 1 };
    } else if (comment.id === id && comment.liked === true) {
      return { ...comment, liked: !comment.liked, likes: 0 };
    } else {
      return comment;
    }
  });
  renderComments();
}

function renderComments() {
  commentsList.innerHTML = "";
  comments.forEach((comment) => {
    const commentElement = document.createElement("li");
    commentElement.classList.add("comment");

    const commentHeader = document.createElement("div");
    commentHeader.classList.add("comment-header");
    commentHeader.innerHTML = `
      <div>${comment.name}</div>
      <div>${getCurrentDate()}</div>
    `;

    const commentBody = document.createElement("div");
    commentBody.classList.add("comment-body");
    commentBody.innerHTML = `
      <div class="comment-text">${comment.text}</div>
    `;

    const commentFooter = document.createElement("div");
    commentFooter.classList.add("comment-footer");
    commentFooter.innerHTML = `
      <div class="likes">
        <span class="likes-counter" id="${comment.id}">${comment.likes}</span>
        <button class="like-button ${comment.liked ? 'like-button_like-button-red' : ''}" id="${comment.id}"
      </div>
    `;

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "Редактировать";

    const saveButton = document.createElement("button");
    saveButton.classList.add("save-button");
    saveButton.textContent = "Сохранить";

    const textarea = document.createElement("textarea");
    textarea.classList.add("text");
    textarea.style.display = "none";

    editButton.addEventListener("click", () => {
      textarea.style.display = "block";
      textarea.value = comment.text;
      editButton.style.display = "none";
      saveButton.style.display = "block";
    });

    saveButton.addEventListener("click", () => {
      const newText = textarea.value.trim();
      if (newText) {
        comment.text = newText;
        textarea.style.display = "none";
        editButton.style.display = "block";
        saveButton.style.display = "none";
        renderComments();
      }
    });

    commentFooter.appendChild(editButton);
    commentFooter.appendChild(saveButton);
    commentFooter.appendChild(textarea);

    commentElement.appendChild(commentHeader);
    commentElement.appendChild(commentBody);
    commentElement.appendChild(commentFooter);

    commentsList.appendChild(commentElement);
  });

  document.querySelectorAll(".like-button").forEach((btn) =>
    btn.addEventListener("click", likesComment)
  );
}

function deleteComment() {
  comments.pop();
  renderComments();
}

function handleEnterKey(e) {
  if (e.key === "Enter") {
    addComment();
  }
}

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
    
function toggleLike(button) {
    button.classList.toggle("like-button_like-button-red");
  }

