document.getElementById("comment-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Получаем значения полей формы
  var name = document.getElementById("name").value;
  var commentText = document.getElementById("comment").value;

  // Валидация полей
  if (!name || !commentText) {
    alert("Необходимо заполнить все поля формы");
    return;
  }

  // Создаем новый комментарий
  var comment = document.createElement("li");
  comment.classList.add("comment");

  var commentHeader = document.createElement("div");
  commentHeader.classList.add("comment-header");

  var commenterName = document.createElement("div");
  commenterName.textContent = name;

  var commentDate = document.createElement("div");
  commentDate.textContent = getCurrentDateTime();

  commentHeader.appendChild(commenterName);
  commentHeader.appendChild(commentDate);

  var commentBody = document.createElement("div");
  commentBody.classList.add("comment-body");

  var commentTextElement = document.createElement("div");
  commentTextElement.classList.add("comment-text");
  commentTextElement.textContent = commentText;

  commentBody.appendChild(commentTextElement);

  var commentFooter = document.createElement("div");
  commentFooter.classList.add("comment-footer");

  var likes = document.createElement("div");
  likes.classList.add("likes");

  var likesCounter = document.createElement("span");
  likesCounter.classList.add("likes-counter");
  likesCounter.textContent = "0";

  var likeButton = document.createElement("button");
  likeButton.classList.add("like-button");

  likes.appendChild(likesCounter);
  likes.appendChild(likeButton);

  commentFooter.appendChild(likes);

  comment.appendChild(commentHeader);
  comment.appendChild(commentBody);
  comment.appendChild(commentFooter);

  // Добавляем комментарий в список
  document.querySelector(".comments").appendChild(comment);

  // Сбрасываем значения полей формы
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
});

function getCurrentDateTime() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();

  return `${padZero(day)}.${padZero(month)}.${year} ${padZero(hours)}:${padZero(minutes)}`;
}

function padZero(number) {
  return number < 10 ? "0" + number : number;
}