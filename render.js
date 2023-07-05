
import { getFetchFunction, initEventListeners, replayToComment } from "./index.js";
import { postFetchPromise} from "./API.js";
import {renderLoginComponent} from "./components/login-component.js"

let token = null;
let name = null;

const renderApp = ( {comments, listComments} ) => {

    const appEl = document.getElementById('app');

    if (!token) {
        renderLoginComponent({
            comments,
            appEl, 
            setToken: (newToken) => {
            token = newToken;
            },
            setName: (newName) => {
            name = newName;
            },
            getFetchFunction,
        });
        
   } else { 
    const commentsHtml = comments.map((comment, index) => listComments(comment, index)).join('');
    const appHtml = 
     `<div class="container">
    
      <ul id = "list" class="comments">
        <!--Список рендерится из JS-->
          ${commentsHtml}
      </ul><br>

        <div class="loader-li">Комментарий добавляется...</div>

        <div class="add-form">
                <input
                type="text"
                id ="name-input"
                value="${name}"
                class="add-form-name"

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
    </div>`;
 
    appEl.innerHTML = appHtml;
 
    const buttonElement = document.getElementById('add-button');  
    const loaderLi = document.querySelector('.loader-li');
    const textInputElement = document.getElementById("textarea-text");
    
    document.getElementById("name-input").setAttribute('disabled', 'disabled');
        

    buttonElement.addEventListener("click", () => {
        
        const addFormElement = document.querySelector('.add-form');
    
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
    
}} ;

export {renderApp};