const buttonElement = document.getElementById('add-button'); 
const listElement = document.getElementById('list'); 
const nameElement = document.getElementById('name');
const commentsElement = document.getElementById('comments');
const likeButtonElement = document.getElementById('add-like-button');

buttonElement.addEventListener("click", () => {
  if (nameElement.value === ""){
    alert("Пожалуйста введите имя!");
    return;
  };
  if (commentsElement.value === ""){
    alert("Пожалуйста введите коментарий!");
    return;
  };
  const oldListHtml = listElement.innerHTML;
  listElement.innerHTML = oldListHtml + 
  `<li>
    <li class="comment">
      <div class="comment-header">
        <div>${nameElement.value}</div>
        <div>${new Date()}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${commentsElement.value}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button class="like-button" id="add-like-button"></button>
        </div>
      </div>
    </li>
  </li>`
})


likeButtonElement.addEventListener("click", () => {
  if (condition) {
    
  } else {
    
  }
})