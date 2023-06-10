import { isLoginMode } from "./components/login-component.js";


export const getApp = (commentsHtml) => {
    return `
            <div class="container">
                <div class="loading" style="display: none;">Комментарии загружаются...</div>
                <ul class="comments" id="list-comments">
                ${commentsHtml}
                </ul>
                <div class="add-form">
                    <input type="text" class="add-form-name" id="add-name" placeholder="Введите ваше имя" />
                    <textarea type="textarea" class="add-form-text" id="add-comment" placeholder="Введите ваш коментарий"
                        rows="4"></textarea>
                    <div class="add-form-row">
                        <button class="add-form-button" id="form-add-button">Написать</button>
                    </div>
                </div>
                <div class="comment-added" style="display: none;">Комментарий добавляется...</div>
            </div>`
};


export const getCommentsAndAuth = (commentsHtml) => {
    return `
            <div class="container">
                <div class="loading" style="display: none;">Комментарии загружаются...</div>
                <ul class="comments" id="list-comments">
                ${commentsHtml}
                </ul>
                <div class="offer">Чтобы добавить комментарий, <a href="#" class="link" id="auth-link">авторизуйтесь</a></div>
            </div>`
};


export const getAuthForm = () => {
    return `
            <div class="container">
                <div class="comment">
                    <h2>Форма ${isLoginMode ? "входа" : "регистрации"}</h2>
                    ${isLoginMode ? "" : `<input type="text" class="add-form-name signin-form" id="name-input" placeholder="Введите имя" /><br>`}
                    <input type="text" class="add-form-name signin-form" id="login-input" placeholder="Введите логин" /><br>
                    <input type="password" class="add-form-name signin-form" id="password-input" placeholder="Введите пароль" /><br>
                    <button class="add-form-button signin-button" id="login-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button><br><br><br>
                    <a href="#" class="link" id="toggle-button">${isLoginMode ? "Зарегистрироваться" : "Войти"}</a>
                </div>
            </div>`
};