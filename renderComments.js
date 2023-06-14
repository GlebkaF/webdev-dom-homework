import {  boxOfComments } from "./comments.js";
import { commentClickListener, initEventListeners, listenerHref, listenersOfForm } from "./listeners.js";
import { allComments, userData} from "./api.js";
import { formatDate } from "./utilis.js";

let token = ""
let logined = ""

export function canLogined(token) {
  if (!token) {
    logined = false
    return logined
  }
   else{
    logined = true
    return logined
  }
}
canLogined(token)

let renderComments = () => {
    let commentsHtml = allComments
    .map((comment, id) => {
      let isLiked = ''
      if (comment.isLiked) {
        isLiked = '-active-like';
      }

       let date = formatDate(comment.date)
      return `<li class="comment" data-id="${id}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class=" like-button ${isLiked}" data-id="${id}"></button>
          </div>
        </div>
      </li>`;
      })
      .join("");
      boxOfComments.innerHTML = commentsHtml;
      initEventListeners();
    };
   


    const forms = document.querySelector('.forms')

  export function renderInputs () {
    forms.innerHTML = `${ logined ? `<div class="add-form " >
    <input
    disabled
    minlength="2"
      type="text"
      class="add-form-name"
      placeholder=${userData.user.name}
    />
    <textarea
    minlength="5"
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      rows="4"
    ></textarea>
    <div class="add-form-row">
      <button class="del-form-button hide">Удалить последний комментарий </button>
      <button class="add-form-button" >Написать</button>
    </div>`: `<div class= "autoriz-info">Только <a id= "reg-href" class="reg-href" href = #> авторизованные  </a>  пользователи могут оставлять комменты  </div>`}` 

      if(logined){
        listenersOfForm()
      }
      else{
        listenerHref()
      }
  }



    function renderLoaderComments () {
        boxOfComments.innerHTML = `<li class=" comment comment_loader loading">
      <div class="comment-header comment__header_loader">
      <div class="animated-background  comment__name_loader">
      </div>
      <div class="animated-background  comment__date_loader">
      </div>
      </div>
      <div class="animated-background  comment-body comment__body_loader">
      </div>
      <div class="likes likes_loader">
      <div class="animated-background  likes__counter_loader"></div>
      <div class="animated-background  like__button_loader"></div>
      </div>
      </li>
      <li class=" comment comment_loader loading">
      <div class="comment-header comment__header_loader">
      <div class="animated-background  comment__name_loader">
      </div>
      <div class="animated-background  comment__date_loader">
      </div>
      </div>
      <div class="animated-background  comment-body comment__body_loader">
      </div>
      <div class="likes likes_loader">
      <div class="animated-background  likes__counter_loader"></div>
      <div class="animated-background  like__button_loader"></div>
      </div>
      </li>`
      }

      function renderRegForm () {
        boxOfComments.innerHTML = `<div class="reg-form" >
        <input id= 'reg-form-name'
        minlength="2"
          type="text"
          class="reg-form-name"
          placeholder="Введите ваше имя"
        />
        <input id= 'reg-form-login'
        type="text"
        minlength="2"
        class="reg-form-login"
        placeholder="Введите ваш логин"
        />
        <input type="password"
        id = 'reg-form-password'
        minlength="2"
        class="reg-form-password"
        placeholder="Введите ваш пароль">
        <div class="add-form-row">
          <button id= reg-button  class="reg-button" > Зарегистрироваться </button>
        </div>`
        forms.innerHTML = `<button class= login-form> Я хочу войти в свой аккаунт </button>` 
      }
      
      export function autorizationForm(params) {
        boxOfComments.innerHTML = `<div class="log-form" >
        <input id= 'log-form-login'
        type="text"
        minlength="2"
        class="log-form-login"
        placeholder="Введите ваш логин"
        />
        <input type="password"
        id = 'log-form-password'
        minlength="2"
        class="log-form-password"
        placeholder="Введите ваш пароль">
        <div class="add-form-row">
        <button class= login> Войти </button>
        </div>`
        forms.innerHTML = `<button id= reg-form-button  class="reg-form-button" > Зарегистрироваться </button>` 
      }
      
      let addForm = document.querySelector('.add-form')
      let loader = document.querySelector('.loader');


      function renderForm(loadedComment) {
        if (loadedComment == true){
          addForm.classList.add('hide')
         // loader.classList.remove('hide')
        } if(loadedComment == false){
          loader.classList.add('hide')
         // addForm.classList.remove('hide')
        }
      }

      
export {renderComments, renderLoaderComments, renderForm, renderRegForm}