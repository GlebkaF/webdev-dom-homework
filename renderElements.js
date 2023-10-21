import { formForComments } from "./commentsForm.js";
import { renderFormLogin } from "./loginForm.js";
import { user, logOut, renderElements } from "./main.js";
import { container } from "./main.js";

export function renderListOfComments(array){

    let listOfElements = array.map((element, index) => {
      console.log(element.isLiked);
        return `<li data-index="${index}" class="comment">
          <div class="comment-header">
            <div>${element.name}</div>
            <div>${element.data}</div>
          </div>
          <div class="comment-body">
            ${element.isEdit ? ` <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4">${element.comment}</textarea>` : `<div class="comment-text">${element.comment}</div>`}
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${element.like}</span>
              <button data-id="${element.id}" class="like-button ${element.isLiked ? "-active-like" : ""}"></button> 
            </div>
          </div>
          <div class="block-btn">
            <button class="change-comment-button">${element.isEdit ? "Сохранить" : "Редактировать"}</button>
            <button data-id="${element.id}" class="delete-comment-button">Удалить</button>
            </div>
        </li>`;
      })
        .join("");
      container.innerHTML = `<ul class="comments">${listOfElements}</ul>`;

      if(!user){
        const textLoader = `<span>Пройдите<a class="loading" href="#"> авторизацию</a></span>`
        container.innerHTML += textLoader
        const loading = document.querySelector(".loading")
        loading.addEventListener("click", () => {
            renderFormLogin()
        })
      }else{
        const exitButton = `<button class="exit-button">Выйти</button>`
        container.innerHTML += exitButton;
        formForComments()
        const exitBtn = document.querySelector(".exit-button")
        exitBtn.addEventListener("click", () => {
          logOut();
          renderElements();
        })
      }
}