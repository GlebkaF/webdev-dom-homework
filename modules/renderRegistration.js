import { setToken, setName, fetchComments, registration } from "./api.js"
import { renderComments } from "./renderComments.js"
import { renderLogin } from "./renderLogin.js"

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form">
    <h1>Форма регистрации</h1>
    <input type="text"
    class="add-form-name login-inputs"
    placeholder="Введите ваше имя"
    id="userName"
    required
    />
    <input type="text"
    class="add-form-name login-inputs"
    placeholder="Введите логин"
    id="login"
    required
    />
    <input type="password"
    class="add-form-name login-inputs"
    placeholder="Введите пароль"
    id="password"
    required
    />
    <fieldset class="add-form-registry">
    <button class="add-form-button-main button-main" type="submit">
    Зарегистрироваться</button>
    <u class="add-form-button-link entry">
    Войти
    </u>
    </fieldset>
    </section>
    `
    container.innerHTML = loginHtml

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const userNameEl = document.querySelector('#userName')
    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        registration(userNameEl.value, loginEl.value, passwordEl.value).then((response) => {
            return response.json()
        }).then((data) => {
            setToken(data.user.token)
            setName(data.user.name)
           //console.log(data);
          renderComments()
        })
    })
}
