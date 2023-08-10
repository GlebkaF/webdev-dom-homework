
"use strict";
const form = document.querySelector('.add-form');
const nameInputElement = document.querySelector('.add-form-name');
const textInputElement = document.querySelector('.add-form-text');
const buttonElement = document.querySelector('.add-form-button');
const commentsElement = document.querySelector('.comments');
const buttonElementDel = document.querySelector('.delete-form-button');
const arrayInputs = [nameInputElement, textInputElement];
const host = "https://wedev-api.sky.pro/api/v1/ala-sharova/comments";
  
  // Функция getAPI позволяет получать данные с сервера
  const getAPI = () => {
    const fetchPromise = fetch(host, {
    method: "GET",
  });
  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
      console.log(responseData);
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes:comment.likes,
          isLiked: false,
          propertyColorLike: 'like-button -no-active-like',
        }
      })
      //comments = responseData.comments;
      comments = appComments;
      renderComments();
      
    });
  })
}
getAPI();

// Функция postAPI позволяет отправлять данные на сервер
const postAPI = (nameInputElement, textInputElement) => {
  return fetch(host, {
    method: "POST", 
    body: JSON.stringify({
      name: nameInputElement.value,
      text: textInputElement.value
    }),
  }).then((response) => {
    response.json().then((responseData) => {
      comments = responseData.todos;
      renderComments();
    })
    renderComments();
    getAPI();
  })
}

let comments = [];

//счетчик лайков

function getLikeButton() {    
  const likesButton = document.querySelectorAll('.like-button');
  for (const like of likesButton) {
    like.addEventListener("click", (event) => {
      const likeIndex = like.dataset.index;
      const commentsElement = comments[likeIndex];
      event.stopPropagation();
 

      if (commentsElement.likeComment) {
        commentsElement.likesNumber -= 1;
        commentsElement.likeComment = false;
        commentsElement.propertyColorLike = 'like-button -no-active-like'; 
        renderComments();
      } else {
        commentsElement.likesNumber += 1;
        commentsElement.likeComment = true;
        commentsElement.propertyColorLike = 'like-button -active-like'; 
        renderComments();      
      }
    })
  }
};

getLikeButton();


// комментарий вводимый пользователем добавляем в массив

buttonElement.addEventListener("click", () => {
  buttonElement.setAttribute('disabled', true);
comments.push({
  name: nameInputElement.value,
  date: currentDate,
  text: textInputElement.value,
  isLiked: false,
  likes: 0,
  propertyColorLike: 'like-button -no-active-like',
});
nameInputElement.value = "";
textInputElement.value = "";

// replyComment();
renderComments();
});

// HTML код через JS
const renderComments = () => {

  const commentsHtml = comments.map((comment, index) => {   
    const commentDate = new Date(comment.date);
    const timeDate = commentDate.toLocaleDateString() + ' ' +commentDate.getHours() + ':' + commentDate.getMinutes();
  return `<li class="comment">
  <div class="comment-header">
  <div>${comment.name}
        </div>
        <div class="date">${timeDate}</div>
      </div>
      <div class="comment-body">
        <div class="comments-text">
          ${comment.text}
        </div></div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter"> ${comment.likes}</span>
          <button data-index="${comment.isLiked}" class='${comment.propertyColorLike}'></button>
  
        </div>
      </div>
    </li>`;
  }).join("");
  
  commentsElement.innerHTML = commentsHtml;
  
  getLikeButton();  
  // replyComment();
  };
  
  renderComments();



// const comments = [
//   {
//     name: 'Глеб Фокин',
//     dateСreation: '12.02.22 12:18',
//     textComment: 'Это будет первый комментарий на этой страницe',
//     likeComment: false,
//     likesNumber: 3,
//     propertyColorLike: 'like-button -no-active-like',
//   },
//   {
//     name: 'Варвара Н.',
//     dateСreation: '13.02.22 19:22',
//     textComment: 'Мне нравится как оформлена эта страница! ❤',
//     likeComment: false,
//     likesNumber: 75,
//     propertyColorLike: 'like-button -no-active-like',
//   },
// ];










// кнопка «Написать» не кликабельна, если имя или текст в форме незаполненные.
buttonElement.setAttribute('disabled', true);

nameInputElement.addEventListener("input", () => {
  buttonElement.setAttribute('disabled', true);
  if ((nameInputElement.value.length > 0) && (textInputElement.value.length > 0)) {
    buttonElement.removeAttribute('disabled');
  }
});
textInputElement.addEventListener("input", () => {
  buttonElement.setAttribute('disabled', true);

  if ((nameInputElement.value.length > 0) && (textInputElement.value.length > 0)) {

    buttonElement.removeAttribute('disabled');
  }
});




//   //Ответы на комментарии
// const replyComment = () => {
// const userCommentElements = document.querySelectorAll(".comment");  
// for ( const userCommentElement of userCommentElements) {
//   userCommentElement.addEventListener("click", () => {
//     textInputElement.value=userCommentElement.dataset.text;
//   })       
// }};

// replyComment();






// формат даты
const currentDate = new Date().getDate().toString().padStart(2, '0') + '.' +
  (new Date().getMonth() + 1).toString().padStart(2, '0') + '.' +
  new Date().getFullYear().toString().slice(-2) + " " +
  new Date().toLocaleTimeString().slice(0, -3);





//нажатие клавиши Enter должно вызывать ту же логику, которая срабатывает при клике на кнопку «Добавить».
document.addEventListener("keyup", function (enter) {
  if (enter.keyCode == 13) {
    buttonElement.click();
  }
});

// //удаление последнего комментари
// buttonElementDel.addEventListener("click", () => {

//   comments.pop();

//   const lastElement = commentsElement.lastElementChild;
//   lastElement.remove();
// });

console.log("It works!");