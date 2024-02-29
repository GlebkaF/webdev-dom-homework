import { auth, authUser, getAuthUser, getToken } from './api.js'
import { fetchAndRenderTasks, tasks } from './main.js'
import { renderTasks } from './renderTasks.js'

export const renderAuth = () => {
    const authHtml = `
        <h1>Страница входа</h1>
        <div class="form">
            <h3 class="form-title">Форма входа</h3>
            <div class="form-row">
                <input type="text" id="login-input" class="input" placeholder="Логин" />
                <input
                    type="text"
                    id="password-input"
                    class="input"
                    placeholder="Пароль"
                    />
            </div>
            <br />
            <button class="button" id="login-button">Войти</button>
            <button id="link-to-tasks">Перейти на страницу задач</button>
        </div>
        `

    container.innerHTML = authHtml

    const inputLogin = document.getElementById('login-input')
    const inputPassword = document.getElementById('password-input')
    const buttonSignIn = document.getElementById('login-button')

    buttonSignIn.addEventListener('click', () => {
        auth({
            login: inputLogin.value,
            password: inputPassword.value,
        }).then((responseData) => {
            getToken(responseData.user.token)
            getAuthUser(true)
            console.log(responseData)
            renderTasks({ tasks, fetchAndRenderTasks, authUser })
        })
    })

    // Рендер комментариев по клику на кнопку "Перейти к комментариям"
    const buttonComments = document.getElementById('link-to-tasks')

    buttonComments.addEventListener('click', () => {
        renderTasks({ tasks, fetchAndRenderTasks, authUser })
    })
}
