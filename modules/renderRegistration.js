import { setToken, setName, fetchComments, registration } from './api.js'
import { renderComments } from './renderComments.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form form-container">
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
        if (
            userNameEl.value.trim() === '' ||
            loginEl.value.trim() === '' ||
            passwordEl.value.trim() === ''
        ) {
            alert('Заполните все поля')
            return
        }

        registration(userNameEl.value, loginEl.value, passwordEl.value)
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                renderComments()
                // renderRegistration()
            })
            .catch((error) => {
                if (
                    error.message.includes(
                        'login должен содержать хотя бы 3 символа'
                    )
                ) {
                    alert('Количество символов должно быть не менее трех')
                }  else {
                alert('Произошла ошибка: ' + error.message);
            }
            
            userNameEl.classList.add('-error');
            loginEl.classList.add('-error');
            passwordEl.classList.add('-error');
            
            setTimeout(() => {
                userNameEl.classList.remove('-error');
                loginEl.classList.remove('-error');
                passwordEl.classList.remove('-error');
            }, 2000);

            if (error.message.includes("Такой пользователь уже существует")) {
                alert('Пользователь с таким логином уже существует');
            }
            userNameEl.classList.add('-error');
            passwordEl.classList.add('-error');
            setTimeout(() => {
                userNameEl.classList.remove('-error');
                passwordEl.classList.remove('-error');
            })
        });
});
}
