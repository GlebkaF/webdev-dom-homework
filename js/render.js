import { dateString } from "./date.js"; 
import { likeListener } from "./likes.js";
import { activeLike } from "./likes.js";
import { answerComment } from "./answers.js";
import { editComment } from "./edit.js";

const buttonToAutorization = document.querySelector('.button_to_autorization');
const formElement = document.querySelector('.login_form_box');

export function renderList({commentsArray, commentsElement}) {
      const commentsHtml = commentsArray.map((comment, index) => {
    
        return `<li class="comment">
          <div class="comment-header">
            <div class="comment-name" data-index="${index}">${comment.author.name}</div>
            <div>${dateString(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text" data-index="${index}">
              ${comment.text}
            </div>
            <textarea class="comment-edit-text hide-elem">${commentsArray[index].text}</textarea>
          </div>
          <div class="comment-footer">
            <button class="edit-button" data-index="${index}">Редактировать</button>
            <button class="save-edit-button hide-elem" data-index="${index}">Сохранить</button>
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${activeLike(comment)}" data-index="${index}"></button>
            </div>
          </div>
        </li>`
      }).join('');

      commentsElement.innerHTML = commentsHtml; 
      likeListener({commentsArray, commentsElement});
      answerComment();
      editComment({commentsArray, commentsElement});
    };

export function buttonToAutorizationListener() { 
      buttonToAutorization.addEventListener("click", () => {
      document.querySelector('.move_to_autorization_box').classList.add("hide-elem");
      
      const autorizationForm = 
      `<div class="autorization_form">
      <p class="form_tittle">Форма входа</p>
      <input type="text" id="login" class="form_input" placeholder="Введите логин">
      <input type="text" id="password" class="form_input" placeholder="Введите пароль">
      <button class="add-form-button-in">Войти</button>
      <button class="reg_button">Зарегистрироваться</button>
      </div>`;
  
      formElement.innerHTML = autorizationForm;

      buttonToRegitrationListener()
  });
  };

export function buttonToRegitrationListener() {
    const buttonToRegitration = document.querySelector('.reg_button');
    buttonToRegitration.addEventListener("click", () => {
      const registrationForm = 
      `<div class="autorization_form">
      <p class="form_tittle">Форма регистрации</p>
      <input type="text" id="name" class="form_input" placeholder="Введите имя">
      <input type="text" id="login" class="form_input" placeholder="Введите логин">
      <input type="text" id="password" class="form_input" placeholder="Введите пароль">
      <button class="add-form-button-in">Зарегистрироваться</button>
      <button class="autorization_button">Войти</button>
      </div>`;

      formElement.innerHTML = registrationForm;
      document.querySelector('.autorization_button').addEventListener("click", () => {
        buttonToAutorization.click();
      })
    })
  }