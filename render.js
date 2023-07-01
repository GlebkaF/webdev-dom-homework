//import { commentsElement } from "./main.js";
import { getFetchFunction, initEventListeners, replayToComment } from "./main.js";
import { postFetchPromise } from "./API.js";
import {renderLoginComponent} from "./components/login-component.js"

let token = null;

const renderApp = ( {comments, listComments} ) => {

    const appEl = document.getElementById('app');
    if (!token) {
        renderLoginComponent({
            appEl, 
            setToken: (newToken) => {
            token = newToken;
            },
            getFetchFunction,
        });
        return;
    }

    const commentsHtml = comments.map((comment, index) => listComments(comment, index)).join('');
    const appHtml =
        `<div class="container">
       <div class="loader">Пожалуйста подождите, комментарии загружаются...</div>
       
        <ul id = "list" class="comments">
    
          <!--Список рендерится из JS-->
            ${commentsHtml}
        </ul>
        <div class="loader-li">Комментарий добавляется...</div>
        <div class="add-form">
          <input
            type="text"
            id ="input-name"
            value=""
            class="add-form-name"
            placeholder="Введите ваше имя"
          />
          <textarea
            type="textarea"
            id ="textarea-text"
            value=""
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button id = "add-button" class="add-form-button">Написать</button>
          </div>
        </div>
      </div>`
    
    appEl.innerHTML = appHtml;
      
    const addFormElement = document.querySelector('.add-form');
    const buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById("list");
    const nameInputElement = document.getElementById("input-name");
    const textInputElement = document.getElementById("textarea-text");
    //export const commentsElement = document.querySelector('.comments');
    const loaderLi = document.querySelector('.loader-li');

    

    buttonElement.addEventListener("click", () => {
    
    
        nameInputElement.style.backgroundColor = '';
        if (nameInputElement.value === "") {
          nameInputElement.style.backgroundColor = 'red';
          return;
        }
      
        textInputElement.style.backgroundColor = '';
        if (textInputElement.value === "") {
          textInputElement.style.backgroundColor = 'red';
          return;
        };
  
        
        loaderLi.style.display = 'flex';
        addFormElement.style.display = 'none';
  
        postFetchPromise({token});
        renderApp( {comments, listComments} );
    });

    initEventListeners(); 
    replayToComment();
    
};

export {renderApp};