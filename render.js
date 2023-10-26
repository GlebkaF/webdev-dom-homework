import { getComments } from './main.js';
import { postElements, showLoadingIndicatorComments, hideAddForm, getToken, autorizatedUser, setToken } from './api.js';
import { userAutorisation } from './login.js';


const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const listElements = document.getElementById("list");
const nameElement = document.querySelector('.add-form-name');
const textElement = document.querySelector('.add-form-text');
const buttonElements = document.querySelector('.add-form-button');
const deleteButtonElement = document.querySelector('.delete-button');

export function renderComments(comments) {
  const appEl = document.getElementById('app');
  const list = document.getElementById("list");
  const commentsHTML = comments.map((element, index) => {
    return `<li class="comment" data-index="${index}" >
         <div class="comment-header">
           <div>${element.name}</div>
           <div>${element.date}</div>
         </div>
         <div class="comment-body">
           <div class="comment-text">
             ${element.text}
           </div>
         </div>
         <div class="comment-footer">
           <div class="likes">
             <span class="likes-counter">${element.likes}</span>
             <button data-index="${index}" class="like-button ${element.islike ? "-active-like" : ""}"></button>
             
           </div>
         </div>
         <button data-index="${index}" class="add-form-button delete-button">Удалить</button>
       </li>`

  }).join("");

  const authorizationRow = `<p>Для добавления комментария, <a id="login-link" class="add-form-link" href='#'>зарегистрируйтесь</а></p>`


  list.innerHTML = commentsHTML;
  commentOnComment(comments);
  deleteComment(comments);
  addLike(comments);
  getComments();
};

export function showAuthForm() {
  const form = document.querySelector(".autorization");
  form.classList.remove("hidden");

};
export function hideAuthForm() {
  const form = document.querySelector(".autorization");
  form.classList.add("hidden");
};

function commentOnComment(comments) {
  const commentInputElement = document.getElementById("comment-input");
  const commentElements = document.querySelectorAll('.comment');
  for (let comment of commentElements) {
    comment.addEventListener('click', () => {
      let index = comment.dataset.index
      let object = comments[index];
      commentInputElement.value = `${object.text}  ${object.name}`
      renderComments(getComments());
    })

  }
}

function deleteComment(comments) {
  const buttonDelete = document.querySelectorAll('.delete-button');
  for (let button of buttonDelete) {
    button.addEventListener('click', (event) => {
      let index = button.dataset.index
      comments.splice(index, 1);
      event.stopPropagation();
      renderComments(getComments());
    })
  }

};


export function addComment(comments) {
  const buttonElement = document.getElementById("add-button");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  buttonElement.addEventListener('click', () => {

    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElement.value === '' || commentInputElement.value === '') {
      nameInputElement.classList.add("error");
      commentInputElement.classList.add("error");
      return;
    }
    const nameInComment = nameElement.value
    const textInComment = textElement.value
    showLoadingIndicatorComments();
    hideAddForm();

    postElements({
      text: textInComment.value,
      name: nameInComment.value
    })

  });

}


function addLike(comments) {

  const likeElements = document.querySelectorAll('.like-button');
  for (let like of likeElements) {
    like.addEventListener('click', (event) => {
      event.stopPropagation();
      let index = like.dataset.index
      let object = comments[index];
      if (object.islike) {
        object.islike = false;
        object.likes--;
      } else {
        object.islike = true;
        object.likes++;
      }
      renderComments(getComments());
    })
  }

}