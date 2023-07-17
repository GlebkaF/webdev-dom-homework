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
  },
  {
    name: "Варвара Н.",
    comment: "Мне нравится как оформлена эта страница! ❤",
    countLikes: 76,
    isLiked: true,
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
  buttonSend.addEventListener("click", () => {
    PEOPLE.push({
      name: inputName.value,
      comment: inputText.value,
      isLiked: false,
      countLikes: 0,
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

const renderPeople = () => {
  let render = PEOPLE.map((el, i) => {
    return `<li class="comment">
    <div class="comment-header">
      <div>${el.name}</div>
      <div>${addDate()}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${el.comment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${el.countLikes}</span>
        <button class="${getLike(el.isLiked)}" data-index=${i}></button>
      </div>
    </div>
  </li>`;
  }).join("");

  listComments.innerHTML = render;
  addLike();
};

renderPeople();
addComment();
