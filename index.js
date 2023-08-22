"use strict";

const commentsArr = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    comment: "Это будет первый комментарий на этой странице",
    likesCounter: 3,
    myLike: false,
    isEdit: false,
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    comment: "Мне нравится, как оформлена эта страница! ❤",
    likesCounter: 75,
    myLike: true,
    isEdit: false,
  },
];

const comments = document.querySelector(".comments");
const addFormBtn = document.querySelector(".add-form-button");
const delFormBtn = document.querySelector(".del-form-button");
const inputName = document.querySelector(".add-form-name");
const inputText = document.querySelector(".add-form-text");

addFormBtn.disabled = true;

const initEventListeners = () => {
  const likeBtns = document.querySelectorAll(".like-button"); //находим все сердечки

  for (const likeBtn of likeBtns) {
    //вешаем обработчик на каждое сердечко
    likeBtn.addEventListener("click", () => {
      const comment = commentsArr[likeBtn.dataset.index]; //по индексу из датасета понимаем, на какое сердечко щас нажали
      comment.myLike ? --comment.likesCounter : ++comment.likesCounter; //если у меня уже было залайкано, то уменьшаем счетчик. И наоборот.
      comment.myLike = !comment.myLike; // меняем в элементе массива лайк на нелайк
      renderComments(); //перерисовываем всё!!
      //Она заново все нарисует, с новым показанием счетчика и сердечком,
      //закрашенным в зависимости от изменившегося статуса myLike
    });
  };

  const editBtns = document.querySelectorAll(".edit-btn"); 

  for (const editBtn of editBtns) {
    editBtn.addEventListener("click", () => {
      const comment = commentsArr[editBtn.dataset.index]; 
      
      console.log(comment);
      renderComments(); 
    });
  };
};

document.addEventListener("input", () => {
  inputName.value != "" && inputText.value != ""
    ? (addFormBtn.disabled = false)
    : (addFormBtn.disabled = true);
});

const plusZero = (str) => {
  return str < 10 ? `0${str}` : str;
};

const now = (currentDate) => {
  let date = plusZero(currentDate.getDate());
  let month = plusZero(currentDate.getMonth() + 1);
  let hours = plusZero(currentDate.getHours());
  let mins = plusZero(currentDate.getMinutes());
  return `${date}.${month}.${currentDate.getFullYear() % 100} ${hours}:${mins}`;
};

const renderComments = () => {
  comments.innerHTML = commentsArr
    .map((comment, index) => {
      return `<li class="comment">
                <div class="comment-header">
                  <div>${comment.name}</div>
                  <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                  <div class="comment-text">
                    ${comment.comment}
                  </div>
                </div>
                <div class="comment-footer">
                  <button data-index="${index}" class='edit-btn'>Редактировать комментарий</button>
                  <div class="likes">
                    <span class="likes-counter">${comment.likesCounter}</span>
                    <button data-index="${index}" class='${comment.myLike ? "like-button -active-like" : "like-button"}'></button>
                  </div>
                </div>
              </li>`;
    })
    .join("");

  inputName.value = "";
  inputText.value = "";
  addFormBtn.disabled = true;
  delFormBtn.disabled = false;
  initEventListeners();
};

renderComments();

const createNewComment = () => {
  let currentDate = new Date();
  commentsArr.push({
    name: inputName.value,
    date: now(currentDate),
    comment: inputText.value,
    likesCounter: 0,
    myLike: false,
    isEdit: false,
  });
};

addFormBtn.addEventListener("click", () => {
  createNewComment();
  renderComments();
});

document.addEventListener("keyup", (e) => {
  if (
    (e.code === "Enter" || e.code === "NumpadEnter") &&
    !addFormBtn.disabled
  ) {
    createNewComment();
    renderComments();
  }
});

delFormBtn.addEventListener("click", () => {
  commentsArr.pop();
  renderComments();
  if (!commentsArr) delFormBtn.disabled = true;
});
