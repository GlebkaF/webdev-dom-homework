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
    isLiked: false,
  },
];

const renderPeople = () => {
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
  let render = PEOPLE.map((el, i) => {
    return `<li class="comment">
    <div class="comment-header">
      <div>${el.name}</div>
      <div>${nowDate.toLocaleString("ru", date)} ${nowDate.toLocaleString(
      "ru",
      time
    )}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${el.comment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${el.countLikes}</span>
        <button class="like-button" data-index=${i}></button>
      </div>
    </div>
  </li>`;
  }).join("");

  listComments.innerHTML = render;
  addLike();
};

function addComment() {
  buttonSend.addEventListener("click", () => {
    PEOPLE.push({
      name: inputName.value,
      comment: inputText.value,
      addlike: false,
      countLikes: 0,
    });
    renderPeople();
    inputName.value = "";
    inputText.value = "";
  });
  addLike();
}

function addLike() {
  const likeButton = document.querySelectorAll(".like-button");
  likeButton.forEach((likeButtonEl) => {
    likeButtonEl.addEventListener("click", () => {
      const index = likeButtonEl.dataset.index;
      let counter = likeButtonEl.previousElementSibling;
      let like = PEOPLE[index].countLikes;
      let countLike = like;
      if (!PEOPLE[index].isLiked) {
        likeButtonEl.className = "like-button -active-like";
        PEOPLE[index].isLiked = true;
        countLike++;
      } else {
        likeButtonEl.className = "like-button";
        PEOPLE[index].isLiked = false;
        countLike--;
      }
      counter.textContent = countLike;
    });
  });
}

renderPeople();
addLike();
addComment();
