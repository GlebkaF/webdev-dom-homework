import * as api from './api.js';
import * as render from './render.js';

const renderLogin = ({userComment, isLoading, addComment}) => {
    const app = document.querySelector('.app');
    const loginHtml = `
    <div class="form comment">
    <h1>Личный кабинет</h1>
    <h3 class="form-title">Авторизация</h3>
    <div class="form-row"><input type="text" id="login-input" class="input" placeholder="Логин"/><input type="text" id="password-input" class="input" placeholder="Пароль"/></div>
    <br/>
    <button class="button" id="login-button">Войти</button>
    </div>`

    app.innerHTML = loginHtml;
    const btnElement = document.querySelector('#login-button');
    const loginInputElement = document.querySelector('#login-input');
    const passwordInputElement = document.querySelector('#password-input');
    btnElement.addEventListener('click', () => {
        api.postLogin({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            api.setToken(responseData.user.token);
            api.setUserName(responseData.user.name);
            return responseData;
        }).then(() => {
            render.renderUserComments({userComment, isLoading, addComment});
        })
    })
}

export {renderLogin}