import{quotation} from "./index.js";
import{fetchFunction} from "./index.js";
//import {addFormElement} from "./index.js";
import {comments} from "./index.js"
//import { nameInputElement, textElement} from "./index.js";
import { loginUser, postFetch } from "./api.js";
//import { likeCommentButton } from "./index.js";
//import { renderLoginComponent } from "./login-components";
const host = "https://wedev-api.sky.pro/api/v2/tanya-bulaeva/comments";
export const buttonElement = document.getElementById('add-form-button');
export const nameInputElement = document.getElementById('input-name');
export const textElement = document.querySelector('.add-form-text');

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;
 const renderComments  = (element, getCommentsList) => {
 const appEl = document.getElementById("app");
  if(!token){
 /*   renderLoginComponent({
      appEl,
      setToken: (newToken) => {
        token = newToken;
      },
      fetchFunction,
    });*/

    //надо вытащить этот текст в рендер логин компонент. начало
         const appHtml = `   <div class="container" id = "container">
    <div class = 'comment'>
        Логин 
          <input type="text"  id="login-input"class="input"
        placeholder="Введите логин" />
        <br/>
        <br/>
        Пароль
        <input  type="password"  id="password-input"class="input"
        placeholder="Введите пароль"/>
        <br/> 
        <br/> 
        <br/> 
        <button id="login-button">Войти</button>`

        appEl.innerHTML = appHtml;
       document.getElementById("login-button").addEventListener('click', () => {
       const login = document.getElementById('login-input').value;
       const password = document.getElementById('password-input').value;
if (!login){
  alert ("Введите логин");
}
if (!password){
  alert ("Введите пароль");
}
      token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
      loginUser({
        login: login,
        password: password}). then ((user) => {
        console.log(user);
  //     setToken(`Bearer ${user.user.token}`) не видит сет токен
    fetchFunction();
      })
    //надо вытащить этот текст в рендер логин компонент. конец  
      })
return;
  }
  const commentsHTML = comments
     .map((comment, index) => getCommentsList (comment, index)).join('');
    const appHtml = `   <div class="container" id = "container">
    <div >

    <ul class="comments" id="comments">
    ${commentsHTML}
    </ul>
    <div class="add-form" id = 'add-form'>
      <input
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя" id = 'input-name'
      />
      <textarea
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4" id ="new-text"
      ></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id = 'add-form-button'>Написать</button> `
  //     addFormElement.classList.remove('hide');
        appEl.innerHTML = appHtml;
        const nameInputElement = document.getElementById('input-name');
         const textElement = document.querySelector('.add-form-text');
         const buttonElement = document.getElementById('add-form-button');

//добавление новых комментариев по кнопке
buttonElement.addEventListener ("click", () => {
  nameInputElement.style.background = '';
if (nameInputElement.value === "" ){
  nameInputElement.style.background = 'red';
  return;
 };
 textElement.style.background = '';
 if (textElement.value === ""){
    textElement.style.background = 'red';
    return;
 };
 console.log(22)
 const addFormElement = document.getElementById('add-form');
addFormElement.classList.remove('hide');

 postFetch();
renderComments (getCommentsList, comments)

})

    
function likeCommentButton() {    
 const likesButton = document.querySelectorAll('.like-button');
for (const like of likesButton) {
   like.addEventListener("click", (event) => {
    event.stopPropagation();
   const likeIndex = like.dataset.index;
    const commentsElement = comments[likeIndex];
            
    if (commentsElement.likeComment) {
    commentsElement.likesNumber -= 1;
    commentsElement.likeComment = false;
    commentsElement.propertyColorLike = 'like-button -no-active-like';           
  } else {
    commentsElement.likesNumber += 1;
   commentsElement.likeComment = true;
    commentsElement.propertyColorLike = 'like-button -active-like';                  
    }
renderComments(element, getCommentsList);
 })
}
};
   likeCommentButton();
     quotation();
     } 
export default renderComments;