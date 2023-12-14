"use strict";

import { getTodos, postTodo } from "./api.js";

const name = document.getElementById("add-form-name");
const commentText = document.getElementById("add-form-text");
const comments = document.getElementById("comments");
const buttonElement = document.getElementById("add-button");
const likeButton = document.getElementById("likeButton");
const likesContainer = document.getElementById("likes-container");
const addFormTexts = document.getElementById("add-form-text");



let people = [
];

  const renderComments = () => {

const likesUlHTML = people.map((comment, index) =>{

return `
<li class="comment">
<div>${comment.author.name}</div>
    <div>${comment.date}</div>
  </div>
  <div class="comment-body">
    <div class="comment-text" id="answer" data-index=${index}>
      ${comment.text}
    </div>
  </div>
  <div class="comment-footer">
<div class="likes" data-like="${index}">
      <span class="likes-counter" id="likes-counter">${comment.likes}</span>
      <button class="like-button ${ comment.isLiked ? '-active-like' : '' }" id="likeButton"></button>
    </div>
  </li>
  `;

})
.join("");
comments.innerHTML = likesUlHTML;
likeEventListeners();
commentEventListeners()
};
getAPI()

// Получаем с сервера API Get
function getAPI(){
  buttonElement.disabled = true;
  buttonElement.textContent = 'Комментарии загружаются...';
 
  getTodos().then((responseData) => {
      console.log(responseData);
      people = responseData.comments; //comments это ключ массива в документации
      renderComments()
    })
  .then((data) => {
    buttonElement.disabled = false;
    buttonElement.textContent = 'Написать';

})
.catch((error) => {
buttonElement.disabled = false;
buttonElement.textContent = 'Написать';
if (error.message === 'Ошибка 500') {
        alert('Ошибка при получении комментариев, пожалуйста, попробуйте позже');
      }
      console.error(error.message);
});
/*500 ошибка*/


};


buttonElement.addEventListener("click", () => {
  if (name.value === "") {
    name.style.backgroundColor = "#ff7d7d";
    return;
  }
  if (commentText.value === "") {
    commentText.style.backgroundColor = "#ff7d7d";
    return;
  }

  let date = new Date();
let output =
  String(date.getDate()) +
  "." +
  String(date.getMonth() + 1) +
  "." +
  date.getFullYear() +
  " " +
  date.getHours() +
  ":" +
  date.getMinutes();


//Отключаем кнопку, пока идет загрузка запроса, чтобы пользователь с медленным интернетом видел
buttonElement.disabled = true;
buttonElement.textContent = 'Элемент добавляется...';
// Выкидываем все на сервер API Post

    postTodo( {textInputElement.value} ).then((responseData) => {
      console.log(responseData);
      getAPI();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = 'Написать';
      commentText.value = '';
    })
    .catch((error) => {
      buttonElement.disabled = false;
      buttonElement.textContent = 'Написать';

      if (error.message === 'Ошибка 500') {
        alert('Ошибка сервера, попробуйте позже');
        return;
      }

      if (error.message === 'Ошибка 400') {
        /*причина этой ошибки */
        alert('Имя и комментарий должны быть не короче 3 символов');
        return;
      }

      alert('Кажется, у вас сломался интернет, попробуйте позже');

      console.log(error);
    });

  likeEventListeners();
  renderComments();
});

  likeEventListeners();
  renderComments();

function likeEventListeners() {
  const likeElements = document.querySelectorAll(".likes");
  for (const likeElement of likeElements) {
    likeElement.addEventListener("click", () => {
      const index = likeElement.dataset.like;
      console.log(index);


      if(people[index].isLiked === false){
        people[index].likes++
        people[index].isLiked = true;
        }
        else {
        people[index].likes--
        people[index].isLiked = false;
        }
        console.log(people[index].likes);
        renderComments();
    });
  }
}


function commentEventListeners(){
  const addFormTexts = document.querySelectorAll(".comment-text");
  for (const addFormText of addFormTexts){
  addFormText.addEventListener("click", (event) =>{
    event.stopPropagation()
    console.log(addFormText.dataset.index);
    console.log(event);
    document.getElementById('add-form-text').value = ">" + people[addFormText.dataset.index].descr + ",";

  })
}
}

commentEventListeners()



renderComments();
likeEventListeners();