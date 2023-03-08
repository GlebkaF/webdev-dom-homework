const buttonElement = document.getElementById("add-button");
const nameElement = document.getElementById("name-input");
const commentsElement = document.getElementById("comments-input");
const listElement = document.getElementById("list");
const commentListElement = document.getElementById("comment-list");
const likeButton = document.querySelector(".like-button");

const options = {
  year: '2-digit',
  month: 'numeric',
  day: 'numeric',
  timezone: 'UTC',
  hour: 'numeric',
  minute: '2-digit'
};
let myDate = new Date().toLocaleDateString("ru-RU", options).replace(',', ' ');

buttonElement.addEventListener("click", () => {
  nameElement.classList.remove("error");
  commentsElement.classList.remove("error");

  if (nameElement.value === '') {
    nameElement.classList.add("error");
    return

  } else if (commentsElement.value === '') {
    commentsElement.classList.add("error");
    return;
  }

  let count = 0;
  const oldListHtml = listElement.innerHTML;
  listElement.innerHTML = oldListHtml + `<li class="comment" id = "comment-list">
    <div class="comment-header">
      <div>${nameElement.value}</div>
      <div>${myDate} </div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${commentsElement.value} 
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${count}</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`
  nameElement.value = '';
  commentsElement.value = '';

});








