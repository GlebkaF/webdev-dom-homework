import { token } from "./api.js"
import { postElements, showLoadingIndicatorComments, hideAddForm, getToken, autorizatedUser, setToken} from './api.js';
import { renderLogin } from "./renderLogin.js";
import { getComments, comments } from './main.js';

const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const listElements = document.getElementById("list");
const nameElement = document.querySelector('.add-form-name');
const textElement = document.querySelector('.add-form-text');
const buttonElements = document.querySelector('.add-form-button');
const deleteButtonElement = document.querySelector('.delete-button');
const buttonElement = document.getElementById("add-button");


export function renderComments(comments) {
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

    const commentsPageHTML = `
    <div class="container">
      <ul id="list" class="comments">
      ${commentsHTML};

      </ul>
      ${token ? `<div class="add-form hidden">
      <input id="name-input"
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
      />
      <textarea id="comment-input"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button " >Написать</button>
      </div>
    </div>` : `<p>Для добавления комментария, <a id="login-link" class="add-form-link" href='#'>зарегистрируйтесь</а></p>`}
      
      <div class="comment-loader hidden">
        <span>Комментарий отправляется</span>
      </div>
    </div>
  </div>
    
    `
    
    const appElement = document.getElementById('app');

    appElement.innerHTML = commentsPageHTML

    const linkToLogin = document.getElementById('login-link')
    linkToLogin?.addEventListener('click', () => {
        renderLogin();
    })
addLike(comments);
getComments();
commentOnComment(comments);
addComment();


}


export function addComment() {

  const buttonElement = document.getElementById("add-button");
  console.log(buttonElement);
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  buttonElement.addEventListener('click', () => {
    console.log(buttonElement);
   
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElement.value === '' || commentInputElement.value === '') {
      nameInputElement.classList.add("error");
      commentInputElement.classList.add("error");
      return;
    }
    // const nameInComment = nameElement.value
    // const textInComment = textElement.value
    //  showLoadingIndicatorComments();
    //  hideAddForm();

    postElements({
      text: commentInputElement.value,
      name: nameInputElement.value
    })

  });
  

}



function addLike(comments) {

  const likeElements = document.querySelectorAll('.like-button');
  for (let like of likeElements) {
    like.addEventListener('click', (event) => {
      event.stopPropagation();
      let index = like.dataset.index
      console.log(index);
      console.log(comments);
      let object = comments[index];
      console.log(object);
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

function commentOnComment(comments) {
  const commentInputElement = document.getElementById("comment-input");
  const commentElements = document.querySelectorAll('.comment');
  for (let comment of commentElements) {
    comment.addEventListener('click', () => {
      let index = comment.dataset.index
      let object = comments[index];
      console.log(commentInputElement);
      commentInputElement.value = `${object.text}  ${object.name}`
      renderComments(getComments());
    })

  }
}
