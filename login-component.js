import { loginApi } from "./api.js"

export function renderLoginComponent({ appEl, setToken, getApiFunction }) {
    let appHtml = `<div class="container">
  <div class="add-form">
  <div class="form-header">Форма входа</div>
  <input type="text" id="get-form-name" class="add-form-name entrance-inputs" placeholder="Введите имя" />
  <input type="text" id="get-form-login" class="add-form-name entrance-inputs" placeholder="Введите логин" />
  <input type="password" id="get-form-password" class="add-form-name entrance-inputs"
    placeholder="Введите пароль" />
  <div class="add-form-row entrance-buttons">
    <button id="login-form-button" class="add-form-button">Войти</button>
    <button id="switch-form-button" class="reg-form-button">Зарегистрироваться</button>
  </div>
  </div>`
    appEl.innerHTML = appHtml

    document.getElementById('login-form-button').addEventListener('click', () => {
        const login = document.getElementById('get-form-login')
        const password = document.getElementById('get-form-password')
        login.classList.remove("error")
        password.classList.remove("error")

        if (login.value === "") {
            login.classList.add("error")
            return
        }
        if (password.value === "") {
            password.classList.add("error")
            return
        }

        loginApi({
            login: login,
            password: password,
        }).then((user) => {
            setToken(`Bearer ${user.user.token}`)
            getApiFunction()
        }).catch(error => {
            alert(error.message)
        })

        // renderApp()
    })

}