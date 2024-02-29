import { auth, getToken, token } from './api.js'

export const renderLogin = ({ mapData }) => {
    const container = document.getElementById('app')
    const authComment = document.getElementById('auth-comment')
    const loginHtml = `
    <div class="container">
      <div class="login-form mrgn-btm-20" id="forma">
        <input
          type="text"
          id="form-login"
          class="add-form-name mrgn-btm-20"
          placeholder="Введите логин"
        />
        <input
          type="password"
          id="form-password"
          class="add-form-name"
          placeholder="Введите пароль"
        />
        <div class="add-form-row">
          <button class="add-form-button width-100" id="login-form-button">Войти</button>
        </div>
        <div class="add-form-row">
          <!--<button class="delete-form-button" id="delete-form-button">Удалить последний коммент</button>-->
        </div>
      </div>
      <!--<a href="" style="color: white;">Зарегистрироваться</a>-->
    </div>
    `

    container.innerHTML = loginHtml
    authComment.innerHTML = ''

    const buttonElement = document.getElementById('login-form-button')
    const loginInput = document.getElementById('form-login')
    const passInput = document.getElementById('form-password')

    buttonElement.addEventListener('click', () => {
        auth({
            login: loginInput.value,
            password: passInput.value,
        })
            .then((responseData) => {
                console.log(responseData)
                getToken(responseData.user.token, responseData.user.name)
                //setUserName(responseData.user.name);
                console.log(token)
                //console.log(userName);
            })
            .then(() => {
                mapData()
            })
            .catch((error) => {
                if (error.message === 'Неверные имя или пароль') {
                    alert('Такого пользователя не существет :(')
                }
            })
    })
}
