import { loginUser, registrationUser } from "./api.js"

export function renderLoginComponent({ appEl, setToken, getApiFunction }) {

    let isLoginMode = true
    const renderForm = () => {
        let appHtml = `<div class="container">
  <div class="add-form">
  <div class="form-header">Форма ${isLoginMode ? "входа" : "регистрации"}</div>
  ${isLoginMode ? "" : `<input type="text" id="get-form-name" class="add-form-name entrance-inputs" placeholder="Введите имя" />`}
  <input type="text" id="get-form-login" class="add-form-name entrance-inputs" placeholder="Введите логин" />
  <input type="password" id="get-form-password" class="add-form-name entrance-inputs"
    placeholder="Введите пароль" />
  <div class="add-form-row entrance-buttons">
    <button id="login-form-button" class="add-form-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
    <button id="switch-form-button" class="reg-form-button">${isLoginMode ? "Зарегистрироваться" : "Вернуться ко входу"}</button>
  </div>
  </div>`
        appEl.innerHTML = appHtml

        document.getElementById('login-form-button').addEventListener('click', () => {

            if (isLoginMode) {
                const login = document.getElementById('get-form-login').value
                const password = document.getElementById('get-form-password').value
                const loginArea = document.getElementById('get-form-login')
                const passwordArea = document.getElementById('get-form-password')


                loginArea.classList.remove("error")
                passwordArea.classList.remove("error")

                if (loginArea.value === "") {
                    loginArea.classList.add("error")
                    return
                }
                if (passwordArea.value === "") {
                    passwordArea.classList.add("error")
                    return
                }

                loginUser({
                    login: login,
                    password: password,
                }).then((user) => {
                    setToken(`Bearer ${user.user.token}`)
                    getApiFunction()
                }).catch(error => {
                    alert(error.message)
                })
            } else {
                const login = document.getElementById('get-form-login')
                const name = document.getElementById('get-form-name')
                const password = document.getElementById('get-form-password')
                const loginArea = document.getElementById('get-form-login')
                const passwordArea = document.getElementById('get-form-password')
                const nameArea = document.getElementById('get-form-name')

                loginArea.classList.remove("error")
                passwordArea.classList.remove("error")
                nameArea.classList.remove("error")

                if (loginArea.value === "") {
                    loginArea.classList.add("error")
                    return
                }
                if (nameArea.value === "") {
                    nameArea.classList.add("error")
                    return
                }
                if (passwordArea.value === "") {
                    passwordArea.classList.add("error")
                    return
                }

                registrationUser({
                    login: login,
                    password: password,
                    name: name,
                }).then((user) => {
                    setToken(`Bearer ${user.user.token}`)
                    getApiFunction()
                }).catch(error => {
                    alert(error.message)
                })
            }


            // renderApp()
        })
        document.getElementById('switch-form-button').addEventListener('click', () => {
            isLoginMode = !isLoginMode
            renderForm()
        })
    }
    renderForm()


}