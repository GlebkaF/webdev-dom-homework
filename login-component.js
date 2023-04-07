import { getDate } from "./secondaryFunc.js";
import {loginUser, registerUser} from './api.js';

export function renderLoginComponent({appEl,comments,setToken,renderComments}){
  let isLoginMode = true;
  const renderForm = () => {
    const commentsHtml =
    comments.map((user, index) => {
      return `<li class="comment"  data-name="${user.author.name}" data-comment="${user.text}">
      <div class="comment-header">
        <div>${user.author.name}</div>
        <div>${getDate(user.date)}</div>
      </div>
      <div class="comment-body" >
     <div class ="comment-text"> ${user.text} </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${user.likes}</span>
          <button data-index="${index}"  class="${user.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
      
        </div>
      </div>
    </li>`
    }).join('')

    const appHtml = `
            <div class="container">
              <p id = 'waitComment' style="display: none">Комментарии загружаются...</p>
              <ul id="list" class="comments">
                ${commentsHtml}
              </ul>
              <p id = 'addingComment' style="display: none">Комментарий добавляется...</p>
              

            <div class="login-form">
              <h2 class="class">Форма ${isLoginMode ? 'входа' : 'Регистрации'}</h2>
              ${
                isLoginMode
                ? ''
                : `<input
                type="text"
                id="name-input"
                class="add-form-name"
                placeholder="Введите имя"
              /> <br/>
                `
              }
 
              <input
                type="text"
                id="login-input"
                class="add-form-name"
                placeholder="Введите ваш логин"
              /> <br/>
              <input
                type="password"
                id="password-input"
                class="add-form-name"
                placeholder="Введите ваш пароль"
              />
              
              <div class="form-row">
                <button id="login-button" class="add-form-button"> ${isLoginMode ? 'войти' : 'зарегестрироваться'}</button>
                <button id="toggle-button" class="add-form-button">
                  Перейти   ${isLoginMode ? 'к регистрации' : 'ко входу'}
                </button>
              </div>
            </div>

          </div>`;

    appEl.innerHTML = appHtml;

    document.getElementById("login-button").addEventListener("click", () => {
      if (isLoginMode) {
        const login = document.getElementById('login-input').value
        const password = document.getElementById('password-input').value
        
           if(!login) {
             alert ('Введите логин')
             return;
           }
     
           if(!password) {
             alert ('Введите пароль')
             return;
           }
     
           loginUser({
             login: login,
             password: password,
           }).then ((user) => { 
                    
               setToken(`Bearer ${user.user.token}`)
               
               renderComments();
           }).catch(error =>{
             alert(error.message)
           })
      } else {
       
        const name = document.getElementById('name-input').value;
        const login = document.getElementById('login-input').value;
        const password = document.getElementById('password-input').value;
        
        if(!name) {
          alert ('Введите имя')
          return;
        }

           if(!login) {
             alert ('Введите логин')
             return;
           }
     
           if(!password) {
             alert ('Введите пароль')
             return;
           }
     
          registerUser({
             login: login,
             password: password,
             name : name,
           }).then ((user) => { 
                    
               setToken(`Bearer ${user.user.token}`)
               
               renderComments();
           }).catch(error =>{
             alert(error.message)
           })
      }
    });
    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode; 
      console.log('click')
      renderForm()
    })

  }
renderForm()

}