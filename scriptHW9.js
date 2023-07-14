const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");



//превод из js -> html
const comments = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    commentText: "Это будет первый комментарий на этой странице",
    like: false,
    likesCounter: 3,
    isEdit: false
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    commentText: "Мне нравится как оформлена эта страница! ❤️",
    like: true,
    likesCounter: 75,
    isEdit: false
  }
];

const renderComments = () => {
  // блокировка кнопки 
  buttonElement.disabled = true;
  buttonElement.classList.add("button-error");
  nameInputElement .addEventListener("input", toggleButtonState);
  textInputElement.addEventListener("input", toggleButtonState);

  // новый элемент
  const commentHtml = comments
    .map((comment, index) => {
      
      let currentDate = new Date();
      let year = currentDate.getFullYear().toString().slice(-2);
      let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
      let day = ('0' + currentDate.getDate()).slice(-2); 
      let hours = ('0' + currentDate.getHours()).slice(-2); 
      let minutes = ('0' + currentDate.getMinutes()).slice(-2);
      let formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

      const likeClass = comment.like ? "-active-like" : ""; 
      const editText = comment.isEdit ? "Сохранить" : "Редактировать"; 
      const editCommentText = comment.isEdit ? `<textarea class="comment-text edited-textarea">${comment.commentText}</textarea>` : `<div class="comment-text">${comment.commentText}</div>`; 
      return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          ${editCommentText}
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter" id="like-counter">${comment.likesCounter}</span>
            <button class="like-button  ${likeClass}" data-index = ${index}></button>
          </div>
        </div>
        <div class="add-form-row">
          <button  class="add-form-button edit-button" data-index = ${index}>${editText}</button>
        </div>
      </li>`;
    })
    .join("");


  listElement.innerHTML = commentHtml;
  
  // функции
  changeLikes(); 
  changeEdit();
}; 

function toggleButtonState() {
  if (nameInputElement.value.trim() !== "" && textInputElement.value.trim() !== "") {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button-error");
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add("button-error");
  }
}

// удаление комментария 
const deleteButtonElement = document.getElementById("delete-comment-button");

deleteButtonElement.addEventListener("click", () => {
  const commentsList = document.getElementsByClassName("comment");
  const lastCommentIndex = commentsList.length - 1;

  if (lastCommentIndex >= 0) {
    commentsList[lastCommentIndex].remove();
  }
});

// изменение лайков
const changeLikes =  () => {
  const likeButtons = document.querySelectorAll('.like-button');
 
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", () => {
  console.log(likeButtons);

      const index = likeButton.dataset.index;
      if (comments[index].like === false) {
        comments[index].like = true;
        comments[index].likesCounter++;
      } else {
        comments[index].like = false;
        comments[index].likesCounter--;
      }
      renderComments();
    });
  }
}

// редактировать текст
const changeEdit = () => {
  const editButtons = document.querySelectorAll('.edit-button');
 
  for (const editButton of editButtons) {
    editButton.addEventListener("click", () => {
      const index = editButton.dataset.index;
      if (comments[index].isEdit === false) {
        comments[index].isEdit = true;
      } else {
        comments[index].isEdit = false;
        const editedComment =document.querySelector('.edited-textarea').value;
        comments[index].commentText = editedComment;
      }
      renderComments();
    });
  }
}

// нажатие enter
textInputElement.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    buttonElement.click(); 
  }
});

// =====================================================================================
// вывод нового элемента
renderComments();
// changeLikes();
buttonElement.addEventListener("click", () => {

  let currentDate = new Date();
  let year = currentDate.getFullYear().toString().slice(-2);
  let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  let day = ('0' + currentDate.getDate()).slice(-2); 
  let hours = ('0' + currentDate.getHours()).slice(-2); 
  let minutes = ('0' + currentDate.getMinutes()).slice(-2);
  let formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  comments.push({
    name: nameInputElement.value,
    date: formattedDate,
    commentText: textInputElement.value,
    like: false,
    likesCounter: 0,
    isEdit: false
  });


//   // добавление даты 
//   let currentDate = new Date();
//   let year = currentDate.getFullYear().toString().slice(-2);
//   let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
//   let day = ('0' + currentDate.getDate()).slice(-2); 
//   let hours = ('0' + currentDate.getHours()).slice(-2); 
//   let minutes = ('0' + currentDate.getMinutes()).slice(-2);
//   let formattedDate = ${day}.${month}.${year} ${hours}:${minutes};

  // // вывод комментария 
  // const oldListHtml = listElement.innerHTML;
  //     listElement.innerHTML =
  //       oldListHtml +
  //       `<li class="comment">
  //       <div class="comment-header">
  //         <div>${nameInputElement.value}</div>
  //         <div>${formattedDate}</div>
  //       </div>
  //       <div class="comment-body">
  //         <div class="comment-text">
  //           ${textInputElement.value}
  //         </div>
  //       </div>
  //       <div class="comment-footer">
  //         <div class="likes">
  //           <span class="likes-counter">0</span>
  //           <button class="like-button"></button>
  //         </div>
  //       </div>
  //     </li>`;

  renderComments();

  nameInputElement.value = "";
  textInputElement.value = "";
 
  buttonElement.disabled = true;
  buttonElement.classList.add("button-error");
});