
const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list-comment");

const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");



buttonElement.addEventListener("click", () => {

  // добавление даты 
  let currentDate = new Date();
  let year = currentDate.getFullYear().toString().slice(-2);
  let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  let day = ('0' + currentDate.getDate()).slice(-2); 
  let hours = ('0' + currentDate.getHours()).slice(-2); 
  let minutes = ('0' + currentDate.getMinutes()).slice(-2);
  let formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  // вывод комментария 
  const oldListHtml = listElement.innerHTML;
      listElement.innerHTML =
        oldListHtml +
        `<li class="comment">
        <div class="comment-header">
          <div>${nameInputElement.value}</div>
          <div>${formattedDate}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${textInputElement.value}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">0</span>
            <button class="like-button"></button>
          </div>
        </div>
      </li>`;

  nameInputElement.value = "";
  textInputElement.value = "";
 
  buttonElement.disabled = true;
  buttonElement.classList.add("button-error");
});


// блокировка кнопки 
buttonElement.disabled = true;
buttonElement.classList.add("button-error");
nameInputElement .addEventListener("input", toggleButtonState);
textInputElement.addEventListener("input", toggleButtonState);

function toggleButtonState() {
  if (nameInputElement.value.trim() !== "" && textInputElement.value.trim() !== "") {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button-error");
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add("button-error");
  }
}

// нажатие enter
textInputElement.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    buttonElement.click(); 
  }
});

// удаление комментария 
const deleteButtonElement = document.getElementById("delete-comment-button");

deleteButtonElement.addEventListener("click", () => {
  const commentsList = document.getElementsByClassName("comment");
  const lastCommentIndex = commentsList.length - 1;

  if (lastCommentIndex >= 0) {
    commentsList[lastCommentIndex].remove();
  }
});