"use strict";
function formatDate(date) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear().toString().slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const formattedDate =
    day + "." + month + "." + year + " " + hours + ":" + minutes;

  return formattedDate;
}

const sanitizeHtml = (htmlString) => {
  return htmlString
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
};

function updateButtonState() {
  buttonElement.classList.remove("error__button");
  addButton.disabled =
    nameInputElement.value.trim() === "" ||
    commentInputElement.value.trim() === "";
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonElement.click();
  }
}

function deleteLastComment() {
  const comments = listElement.getElementsByClassName("comment");
  if (comments.length > 0) {
    const lastComment = comments[comments.length - 1];
    listElement.removeChild(lastComment);
  }
}

const handleEditClick = (index) => {
  const editButtonElements = document.querySelectorAll(".edit-button");
  const saveButtonElements = document.querySelectorAll(".save-button");
  editButtonElements[index].style.display = "none";
  saveButtonElements[index].style.display = "inline-block";

  const commentTextElement =
    listElement.getElementsByClassName("comment-text")[index];
  const currentText = commentTextElement.textContent.trim();
  const textareaElement = document.createElement("textarea");
  textareaElement.value = currentText;
  commentTextElement.innerHTML = "";
  commentTextElement.appendChild(textareaElement);
};

const handleSaveClick = (index) => {
  const textareaElement = listElement.querySelector(".comment textarea");
  const editedText = textareaElement.value;

  comments[index].comment = editedText;
  fetchPromisePost(comments[index].comment, comments[index].name);
  renderComments();
};

const initLikeButton = () => {
  const likeButtonsElements = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtonsElements) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButton.dataset.index;
      likeButton.classList.add("-loading-like");

      delay(2000).then(() => {
        if (comments[index].isLike === false) {
          likeButton.classList.add("-active-like");
          comments[index].isLike = true;
          comments[index].likes++;
        } else {
          likeButton.classList.remove("-active-like");
          comments[index].isLike = false;
          comments[index].likes--;
        }
        likeButton.classList.remove("-loading-like");
        const likesCounter =
          likeButton.parentNode.querySelector(".likes-counter");
        likesCounter.textContent = comments[index].likes;
      });
    });
  }
};

const initReplyButton = () => {
  const commentsElements = document.querySelectorAll(".comment");
  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", (event) => {
      const indexComment = commentElement.dataset.index;
      const curruntComment = comments[indexComment].comment;
      const curruntName = comments[indexComment].name;
      commentInputElement.value = `${curruntComment}\n${curruntName} - `;
    });
  }
};

const initEditButton = () => {
  const editButtonElements = document.querySelectorAll(".edit-button");
  editButtonElements.forEach((editButton, index) => {
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      handleEditClick(index);
    });
  });
};

const initSaveButton = () => {
  const saveButtonElements = document.querySelectorAll(".save-button");
  saveButtonElements.forEach((saveButton, index) => {
    saveButton.addEventListener("click", (event) => {
      event.stopPropagation();
      handleSaveClick(index);
    });
  });
};

const renderComments = () => {
  const commnetsHTML = comments
    .map((comment, index) => {
      if (comment.isLike === false) {
        return `<li class="comment" data-index="${index}">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text"">
                ${comment.comment}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button id="like_button" data-index="${index}" class="like-button"></button>
              </div>
            </div>
            <button id="edit_button" data-index="${index}" class="add-form-button edit-button">Редактировать</button>
            <button id="save_button" data-index="${index}" class="add-form-button save-button">Сохранить</button>
          </li>`;
      } else {
        return `<li class="comment" data-index="${index}">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text"">
                ${comment.comment}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button id="like_button" data-index="${index}" class="like-button -active-like"></button>
              </div>
            </div>
            <button id="edit_button" data-index="${index}" class="add-form-button edit-button">Редактировать</button>
            <button id="save_button" data-index="${index}" class="add-form-button save-button">Сохранить</button>
            </li>`;
      }
    })
    .join("");
  listElement.innerHTML = commnetsHTML;
  initLikeButton();
  initSaveButton();
  initEditButton();
  initReplyButton();
};

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

const buttonElement = document.getElementById("add-button");
const likeButton = document.getElementById("like_button");
const listElement = document.getElementById("list");
const formElement = document.querySelector(".add-form");
const nameInputElement = document.getElementById("input-name");
const commentInputElement = document.getElementById("comment-input");
const deleteLastButton = document.getElementById("delete-last-button");
let date = new Date();
let today = formatDate(date);

let comments = [];
const fetchPromiseGet = () => {
  const fetchPromise = fetch(
    "https://wedev-api.sky.pro/api/v1/gleb-fokin/comments",
    {
      method: "get",
    }
  );

  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: formatDate(new Date(comment.date)),
          comment: comment.text,
          likes: comment.likes,
          isLike: false,
        };
      });
      comments = appComments;
      renderComments();
    });
};
const fetchPromisePost = async (textValue, nameValue) => {
  const fetchPromise = await fetch(
    "https://wedev-api.sky.pro/api/v1/gleb-fokin/comments",
    {
      method: "post",
      body: JSON.stringify({
        text: sanitizeHtml(textValue),
        name: sanitizeHtml(nameValue),
      }),
    }
  );
};

document.addEventListener("DOMContentLoaded", async () => {
  listElement.innerHTML = "<p>Загрузка данных...</p>";
  await fetchPromiseGet();
});

nameInputElement.addEventListener("keypress", handleKeyPress);
commentInputElement.addEventListener("keypress", handleKeyPress);
buttonElement.addEventListener("keypress", handleKeyPress);
deleteLastButton.addEventListener("click", deleteLastComment);

buttonElement.addEventListener("click", async () => {
  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");
  buttonElement.classList.remove("error__button");

  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    buttonElement.classList.add("error__button");
    nameInputElement.addEventListener("input", updateButtonState);
    return;
  } else if (commentInputElement.value === "") {
    commentInputElement.classList.add("error");
    buttonElement.classList.add("error__button");
    commentInputElement.addEventListener("input", updateButtonState);
  } else {
    formElement.innerHTML = "<p>Комментарий добавляется...</p>";

    await fetchPromisePost(commentInputElement.value, nameInputElement.value);
    fetchPromiseGet();
    formElement.innerHTML = `
    <input type="text" id="input-name" class="add-form-name" placeholder="Введите ваше имя" />
    <textarea type="textarea" id="comment-input" class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
    <div class="add-form-row">
      <button id="add-button" class="add-form-button">Написать</button>
    </div>
  `;
    nameInputElement.value = "";
    commentInputElement.value = "";
  }
});
console.log("It works!");
