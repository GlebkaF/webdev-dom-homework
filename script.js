function dt() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const datetime = `${day}.${month}.${year} ${hours}:${minutes}`;
  console.log(datetime);
  return datetime;
}

const nameInputElement = document.getElementsByClassName('add-form-name')[0];
const commentsElement = document.getElementsByClassName('add-form-text')[0];
const buttonElement = document.getElementsByClassName('add-form-button')[0];
const listElement = document.getElementsByClassName('comments')[0];
console.log(nameInputElement);
console.log(commentsElement);
console.log(buttonElement);

buttonElement.addEventListener("click", () => {

  nameInputElement.classList.remove("error");
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  }
  let datetime = dt();
  const oldListHtml = listElement.innerHTML;
  listElement.innerHTML =
    oldListHtml +
    `<li class="comment">
        <div class="comment-header">
          <div>${nameInputElement.value}</div>
          <div>${datetime}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${commentsElement.value}
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
  commentsElement.value = "";
});