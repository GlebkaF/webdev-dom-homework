// Объявление переменных

const addButtonElement = document.getElementById("add-button");
const delButtonElement = document.getElementById("delete-button");
const listElement = document.getElementById("list");
const commentHeaderElement = document.getElementById("comment-header");
const commentTextElement = document.getElementById("comment-text");
const nameInputElement = document.getElementById("name-input");
const commentTxtareaElement = document.getElementById("comment-txtarea");
const mainForm = document.querySelector(".add-form");
let quote = "";
let comments = [];

// GET

const getComments = () => {
  fetch("https://webdev-hw-api.vercel.app/api/v1/gladyshko-fedor/comments", {
    method: "GET",
  }).then((response) => {
    const jsonPromise = response.json();

    jsonPromise.then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString("ru-RU", dateOptions),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
          isEdit: false,
          isReplied: false,
        };
      });

      comments = appComments;
      renderComments();
    });
  });
};
getComments();

// Функция очистки полей ввода и блокировки кнопки "Написать"

const delValue = () => {
  nameInputElement.value = "";
  commentTxtareaElement.value = "";
  addButtonElement.classList.add("add-form-button--inactive");
  addButtonElement.disabled = true;
};

// Функция обработчика событий лайков

const initLikeButtonsListeners = () => {
  const likeButtonsElements = document.querySelectorAll(".like-button");

  for (const likeButtonElement of likeButtonsElements) {
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButtonElement.dataset.index;

      if (comments[index].isLiked === true) {
        comments[index].isLiked = false;
        comments[index].likes -= 1;
      } else if (comments[index].isLiked === false) {
        comments[index].isLiked = true;
        comments[index].likes += 1;
      }
      renderComments();
    });
  }
};

// Функция ответа на комментарии work in progress (задание со звездочкой)

const replyListeners = () => {
  const commentTextElements = document.querySelectorAll(".comment-text");

  for (const commentTextElement of commentTextElements) {
    commentTextElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = commentTextElement.dataset.index;
      commentTxtareaElement.value = `> ${comments[index].text} \n ${comments[index].name}, `;
      quote = `QUOTE_BEGIN ${comments[index].name} \n ${comments[index].text} QUOTE_END`;
      commentTextElement.setAttribute("readonly", true);
      if (comments[index].isReplied) {
        renderComments();
      }
    });
  }
};

// Функция редактирования комментариев

const initEditButtonsListeners = () => {
  const editButtonsElements = document.querySelectorAll(".edit-button");

  for (const editButtonElement of editButtonsElements) {
    editButtonElement.addEventListener("click", () => {
      const index = editButtonElement.dataset.index;
      const editTextArea = document.querySelector(".area-text");
      if (comments[index].isEdit === true) {
        comments[index].isEdit = false;
        comments[index].text = editTextArea.value;
      } else if (comments[index].isEdit === false) {
        comments[index].isEdit = true;
      }
      renderComments();
    });
  }
};

// Рендер-функция

const renderComments = () => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            ${
              comment.isEdit
                ? `<textarea class ="area-text">${comment.text}</textarea>`
                : `<div data-index="${index}" class ="comment-text">
                ${
                  comment.isReplied
                    ? `<div class="quote">${quote
                        .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
                        .replaceAll("QUOTE_END", "</div>")}</div>`
                    : ``
                }
            ${comment.isReplied ? "" : comment.text}`
            }
          </div>
          <div class="comment-footer">
            <button data-index="${index}" class="add-form-button edit-button">${
        comment.isEdit ? `Сохранить` : `Редактировать`
      }</button>
            <div class="likes">
              <span class="likes-likes">${comment.likes}</span>
              <button data-index="${index}" class="${
        comment.isLiked ? "like-button -active-like" : "like-button"
      }"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");
  listElement.innerHTML = commentsHtml;

  initLikeButtonsListeners();
  initEditButtonsListeners();
  replyListeners();
};

renderComments();

// Работа с датой комментариев

const dateOptions = {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
  timezone: "UTC",
  hour: "numeric",
  minute: "2-digit",
};
const date = new Date().toLocaleString("ru-RU", dateOptions);

// Расширенная валидация

window.addEventListener("input", () => {
  if (nameInputElement.value !== "" && commentTxtareaElement.value !== "") {
    addButtonElement.classList.remove("add-form-button--inactive");
    addButtonElement.disabled = false;
  }
});

// Функция добавления нового комментария

addButtonElement.addEventListener("click", () => {
  // Функция безопасности от внедрения файлов через input
  function protectInput(someEdit) {
    someEdit = someEdit
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;");
    return someEdit;
  }

  // POST

  fetch("https://webdev-hw-api.vercel.app/api/v1/gladyshko-fedor/comments", {
    method: "POST",
    body: JSON.stringify({
      name: protectInput(nameInputElement.value),
      text: protectInput(commentTxtareaElement.value),
      date: date,
      likes: 0,
      isLiked: false,
      isEdit: false,
      isReplied: false,
    }),
  }).then((response) => {
    const jsonPromise = response.json();

    jsonPromise.then((responseData) => {
      comments = responseData;
      getComments();
      renderComments();
    });
  });

  renderComments();
  delValue();
});

// Добавление нового комментария посредством нажатия Enter

mainForm.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    addButtonElement.click();
    delValue();
  }
});

// Удаление последнего комментария

delButtonElement.addEventListener("click", () => {
  if (listElement.lastElementChild) {
    listElement.lastElementChild.remove();
  }
});
