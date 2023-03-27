const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const currentDate = new Date().toLocaleString();
const deleteButton = document.getElementById("del-button");
const commentElements = document.querySelectorAll(".comment");



const comments = [{
    nameComment: "Глеб Фокин",
    textComment: "Это будет первый комментарий на этой странице",
    dateComment: "12.02.22 12:18",
    likesComment: 3
  },
  {
    nameComment: "Варвара Н.",
    textComment: "Мне нравится как оформлена эта страница! ❤",
    dateComment: "13.02.22 19:22",
    likesComment: 75
  }
];

const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment" data-name="${comment.nameComment}">
    <div class="comment-header">
      <div>${comment.nameComment}</div>
      <div>${comment.dateComment}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.textComment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter" data-like="${index}">${comment.likesComment}</span>      
        <button class="like-button"></button>
      </div>
    </div>
  </li>`;
  }).join('');
  listElement.innerHTML = commentsHtml;
};

renderComments();



buttonElement.addEventListener('click', () => {
  nameInputElement.classList.remove("error");
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  } else if (textInputElement.value === "") {
    textInputElement.classList.add("error");
    return;
  }
  comments.push({
    nameComment: nameInputElement.value,
    textComment: textInputElement.value,
    dateComment: currentDate,
    likesComment: 0
  });
  renderComments();
  likeButtonsListeners();
});

function inputCheck() {
  buttonElement.classList.remove("turn-off");
  if (document.getElementById("name-input").value === "" || document.getElementById("text-input").value === "") {
    document.getElementById("add-button").disabled = true;
    buttonElement.classList.add("turn-off");
  } else {
    document.getElementById("add-button").disabled = false;
    buttonElement.classList.remove("turn-off");
  }
}




nameInputElement.addEventListener("input", inputCheck);

textInputElement.addEventListener("input", inputCheck);

nameInputElement.addEventListener("keyup", ({
  key
}) => {
  if (key === "Enter") {
    nameInputElement.classList.remove("error");
    if (nameInputElement.value === "") {
      nameInputElement.classList.add("error");
      return;
    } else if (textInputElement.value === "") {
      textInputElement.classList.add("error");
      return;
    }
    renderComments();
  }

});

textInputElement.addEventListener("keyup", ({
  key
}) => {
  if (key === "Enter") {
    textInputElement.classList.remove("error");
    if (textInputElement.value === "") {
      textInputElement.classList.add("error");
      return;
    } else if (nameInputElement.value === "") {
      nameInputElement.classList.add("error");
      return;
    }
    renderComments();
  }

});


//кнопка удаления
deleteButton.addEventListener('click', () => {
  listElement.lastElementChild.remove(`${textInputElement.value}`);
});

//счетчик лайков

const likeButtonsListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");
// console.log(likeButtons);
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
      const index = likeButton.dataset.like;
      if (likeButton.classList.contains("like-button")) {
        likeButton.classList.toggle("-active-like");
        // likeButton.classList.remove("like-button");
        // likeButton.classList.add("-active-like");
        comments[index].likesComment +=1;
        renderComments();
      } else {
        // likeButton.classList.remove("-active-like");
        likeButton.classList.add("like-button");
        comments[index].likesComment -=1;
      }
      renderComments();
    });
  }
  
};

likeButtonsListeners();


