import { loginUser, registerUser } from "../api.js";
import { comments } from "../index.js";
import { myDate } from "../optionalFunction.js";

export function renderLoginComponent({ appEl, setToken, getFetchPromise }) {

let isLoginMode = true;

const renderForm = () => {
    const commentHtml = comments.map((comment, index) => {
        return `<li class="comment" data-name='${comment.name}' data-comment='${comment.text}'>
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${myDate(new Date(comment.date))}</div>
      </div>
      <div class="comment-body">
    
        ${comment.isEdit ? `<textarea class= "edit-area-text" onclick = "event.stopPropagation()">${comment.text}</textarea>` : `<div class="comment-text" data-index='${index}' data-name='${comment.name}' data-comment='${comment.text}'>${comment.text.replaceAll('*_', '<div class="quote">').replaceAll('__*', '</div>')}</div>`}
      
      </div>
      <div class="comment-footer">
       <div class="likes">
        <span class="likes-counter">${comment.likes}</span>
    
        <button class="${comment.isLike ? "like-button -active-like" : "like-button"}" data-index='${index}'></button>
    
        ${comment.isEdit ? `<button class="save-button button-comment" data-index='${index}'>Сохранить</button>` : `<button class="edit-button button-comment" data-index='${index}'>Редактировать</button>`}
        
        <button class = "delete-button button-comment" data-index='${index}'>Удалить комментарий</button>
       </div>
      </div>
    </li>`
      }).join('');

    const appHtml = `
    <section id="loaderComments" class="loader -display-none">
    <h4 id="loaderText" class="text-loader">Комментарии загружаются...</h4>
    </section>
    <div class="container">
    <ul class="comments">
    <!-- список рендерится из js !!!!!!!-->
    ${commentHtml}
    </ul>
  
    <div class="add-form add-form--register">
      <h3>Чтобы добавить комментарий, авторизуйтесь</h3>
      <h3 class="form-title">Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
      ${
        isLoginMode
        ? ""
        : `<input
        type="text"
        class="add-form-name"
        placeholder="Введите имя"
        rows="4"
        value = ""
        /><br/>`
      }
      
      <input
        type="text"
        class="add-form-login"
        placeholder="Введите логин"
        value=""
      /><br/>
      <input
        type="password"
        class="add-form-password"
        placeholder="Введите пароль"
        rows="4"
        value = ""
      ></input>
     
      <div class="add-form-row">
      <button class="login-form-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
      <button class="toggle-form-button">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}</button>
      </div>
    </div>`;

    appEl.innerHTML = appHtml;

    document.querySelector('.login-form-button').addEventListener('click', () => {
        // setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
        if(isLoginMode) {
            const login = document.querySelector('.add-form-login').value;
            const password = document.querySelector('.add-form-password').value;
    
            if (!login) {
                alert('Введите логин');
                return;
            }
            if (!password) {
                alert('Введите пароль');
                return;
            }
    
            loginUser({
                login: login,
                password: password,
            }).then((user) => {
                // console.log(user);
                setToken(`Bearer ${user.user.token}`);
                getFetchPromise();
                //renderComments();
            }).catch(error => {
                alert(error.message)
            });
        } else {
            const login = document.querySelector('.add-form-login').value;
            const password = document.querySelector('.add-form-password').value;
            const name = document.querySelector('.add-form-name').value;

            if (!name) {
                alert('Введите пароль');
                return;
            }   
            if (!login) {
                alert('Введите логин');
                return;
            }
            if (!password) {
                alert('Введите пароль');
                return;
            }
            
    
            registerUser({
                name: name,
                login: login,
                password: password,
            }).then((user) => {
                // console.log(user);
                setToken(`Bearer ${user.user.token}`);
                getFetchPromise();
                //renderComments();
            }).catch(error => {
                alert(error.message)
            });
        }

    });

    document.querySelector('.toggle-form-button').addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        renderForm();
    });
};
renderForm();
}