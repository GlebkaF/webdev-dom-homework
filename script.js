"use strict";
console.log("It works!");
const buttonElement = document.getElementById("add-button");
const commentElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");

const comments = [
{
  name: "Глеб Фокин",
  data: "12.02.22 12:18",
  comment: "Это будет первый комментарий на этой странице",
  likes: false,
  numberLikes: 3
},
{
  name: "Варвара Н.",
  data: "13.02.22 19:22",
  comment: "Мне нравится как оформлена эта страница! ❤ ",
  likes: true,
  numberLikes: 75
}
]



buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("error")
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  };

  textInputElement.classList.remove("error")
  if (textInputElement.value === "") {
    textInputElement.classList.add("error");
    return;
  };

  function formatDate(myDate) {
    let date = myDate.getDate();
    let month = myDate.getMonth() + 1;
    let hour = myDate.getHours();
    let minute = myDate.getMinutes();

    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + (month + 1);
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return `${date}.${month}.${myDate.getFullYear().toString().substr(-2)} ${hour}:${minute}`;
  }
   comments.push({
    name: nameInputElement.value,
    data: formatDate(new Date()),
    comment: textInputElement.value,
    likes: false,
    numberLikes: 0
   })


  renderComments(); 

  nameInputElement.value = "";
  textInputElement.value = "";
});
const initLikeButtonListeners = () => {
  for (const likeButton of document.querySelectorAll(".like-button")) {
    likeButton.addEventListener("click", () => {
      const index = likeButton.dataset.index;
      const comment = comments[index];
      if (comment.likes) {
        comment.likes = false;
        comment.numberLikes--;
      } else {
        comment.likes = true;
        comment.numberLikes++;
      }

      likeButton.classList.toggle("-active-like", comment.likes);
      const likesCounter = likeButton.previousElementSibling;
      likesCounter.textContent = comment.numberLikes;
    });
  }
}

const renderComments = () => {
  const commentsHtml = comments
  .map((comment, index) => {
    return `
    <li class="comment">
      <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.data}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter" data-index=${index}>${comment.numberLikes}</span>
            <button class="like-button${comment.likes ? " -active-like" : ""}" data-index=${index}></button>
          </div>
        </div>
      </li>`
  })
  .join("")

  commentElement.innerHTML = commentsHtml
  initLikeButtonListeners();
}

renderComments();
