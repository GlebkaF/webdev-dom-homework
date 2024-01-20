const addButtonElement = document.getElementById("add-button");
const addFormElement = document.getElementById("add-form");
const deleteButtonElement = document.getElementById("delete-button");
const nameInputElement = document.getElementById("name-input");
const commentAreaElement = document.getElementById("comment-area");
const commentsList = document.getElementById("comments-list");

const currentDate = new Date();
const formattedDateTime = currentDate.toLocaleString('ru-Ru', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
});

nameInputElement.addEventListener('input', handleInputChange);
commentAreaElement.addEventListener('input', handleInputChange);

function handleInputChange() {
  const name = nameInputElement.value.trim();
  const comment = commentAreaElement.value.trim();

  if (name !== '' && comment !== '') {
    addButtonElement.disabled = false;
    addButtonElement.classList.remove('error');
  } else {
    addButtonElement.disabled = true;
    addButtonElement.classList.add('error');

  }
}

commentAreaElement.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    addComment();
  }
});

addButtonElement.addEventListener("click", addComment);

function addComment() {
  const oldCommentsListHtml = commentsList.innerHTML;
  const name = nameInputElement.value.trim();
  const comment = commentAreaElement.value.trim();

  if (name !== '' && comment !== '') {
    commentsList.innerHTML = oldCommentsListHtml + `<li class="comment">
    <div class="comment-header">
      <div>${nameInputElement.value}</div>
      <div>${formattedDateTime}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${commentAreaElement.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`

  nameInputElement.value = '';
  commentAreaElement.value = '';
  addButtonElement.disabled = true;
  addButtonElement.classList.add('error');
  }


}

deleteButtonElement.addEventListener("click", () => {
  commentsList.removeChild(commentsList.lastChild);
});

