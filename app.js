"use strict";

const inputName = document.getElementById("add-form-name");
const inputText = document.getElementById("add-form-text");
const buttonSend = document.querySelector(".add-form-button");
const listComments = document.querySelector(".comments");

let PEOPLE = [
  {
    name: "Глеб Фокин",
    comment: "Это будет первый комментарий на этой странице",
    countLikes: 3,
    isLiked: false,
    isItDate: "12.02.22 12:18",
  },
  {
    name: "Варвара Н.",
    comment: "Мне нравится как оформлена эта страница! ❤",
    countLikes: 76,
    isLiked: true,
    isItDate: "13.02.22 19:22",
  },
];

const addDate = () => {
  let nowDate = new Date();
  let time = {
    hour: "numeric",
    minute: "numeric",
  };
  let date = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return (
    nowDate.toLocaleDateString("ru", date) +
    " " +
    nowDate.toLocaleTimeString("ru", time)
  );
};

function addComment() {
  buttonSend.addEventListener("click", (event) => {
    inputName.classList.remove("error");
    inputText.classList.remove("error");
    if (inputName.value.length === 0 && inputText.value.length === 0) {
      inputName.classList.add("error");
      return;
    }
    if (inputName.value.length === 0) {
      inputName.classList.add("error");
      return;
    }
    if (inputText.value.length === 0 && inputText.value.length === 0) {
      inputText.classList.add("error");
      return;
    }
    event.stopPropagation();
    PEOPLE.push({
      name: inputName.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      comment: inputText.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      isLiked: false,
      countLikes: 0,
      isItDate: addDate(),
    });
    renderPeople();
    inputName.value = "";
    inputText.value = "";
  });
}

function addLike() {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((likeButtonEl) => {
    likeButtonEl.addEventListener("click", () => {
      const index = likeButtonEl.dataset.index;
      let likeEl = PEOPLE[index];
      if (likeEl.isLiked === false) {
        PEOPLE[index].isLiked = true;
        likeEl.countLikes++;
        renderPeople();
      } else {
        PEOPLE[index].isLiked = false;
        likeEl.countLikes--;
        renderPeople();
      }
    });
  });
}

const getLike = (elementPeople) => {
  return elementPeople ? "like-button -active-like" : "like-button";
};

const takeCommentText = () => {
  const comentText = document.querySelectorAll(".comment-text");
  const textArea = document.getElementById("add-form-text");
  comentText.forEach((textElement, index) => {
    textElement.addEventListener("click", (event) => {
      event.stopPropagation();
      let textValue = textElement.textContent;
      return (textArea.value = `>${textValue} ${PEOPLE[index].name}  Ответ - `);
    });
  });
};

const delCommentElement = () => {
  const delColBut = document.querySelectorAll(".del-form-button");
  delColBut.forEach((delButton, index) => {
    delButton.addEventListener("click", (event) => {
      event.stopPropagation();
      PEOPLE.splice(index, 1);
      renderPeople();
    });
  });
};

const checkError = () => {
  buttonSend.addEventListener("click", () => {
    inputName.classList.remove("error");
    inputText.classList.remove("error");
    if (inputName.value === "") {
      inputName.classList.add("error");
      return;
    }
    if (inputName.value === "") {
      inputText.classList.add("error");
      return;
    }
  });
};

const renderPeople = () => {
  let render = PEOPLE.map((el, i) => {
    return `<li class="comment">
    <div class="comment-header">
      <div>${el.name}</div>
      <div>${el.isItDate}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text"  data-index="${i}">
        ${el.comment}
      </div>
    </div>
    <div class="comment-footer">
    <button class="del-form-button" data-index="${i}">Удалить</button>
      <div class="likes">
        <div>
          <span class="likes-counter">${el.countLikes}</span>
          <button class="${getLike(el.isLiked)}" data-index=${i}></button></div>
      </div>
    </div>
  </li>`;
  }).join("");

  listComments.innerHTML = render;
  addLike();
  takeCommentText();
  delCommentElement();
};

addLike();
addComment();
renderPeople();
