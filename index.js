const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const dateOption = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
};
const timeOption = {
    timezone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
}
let nowDate = new Date().toLocaleString("ru-RU", dateOption);
let nowTime = new Date().toLocaleString("ru-RU", timeOption);

buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
    } else if (commentInputElement.value === "") {
        commentInputElement.classList.add("error");
        return;
    }

    const oldListElement = listElement.innerHTML;
    listElement.innerHTML = oldListElement +
        `<li id="comment" class="comment">
        <div class="comment-header">
          <div>${nameInputElement.value}</div>
          <div>${nowDate} ${nowTime} </div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${commentInputElement.value}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">0</span>
            <button class="like-button"></button>
          </div>
        </div>
      </li>`;

});


