import { loginUser, setToken, setUserName, token, userName } from "./api.js";

export const renderLogin = ( {mapData} ) => {
    const container = document.getElementById('app');
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
      <a href="" style="color: white;">Зарегистрироваться</a>
    </div>
    `;

    container.innerHTML = loginHtml;

    const buttonElement = document.getElementById('login-form-button');
    const loginInput = document.getElementById('form-login');
    const passInput = document.getElementById('form-password');

    buttonElement.addEventListener('click', () => {
        loginUser({
            login: loginInput.value,
            password: passInput.value
        }).then((responseData) => {
            console.log(responseData);
            setToken(responseData.user.token);
            setUserName(responseData.user.name);
            console.log(token);
            console.log(userName);
        }).then(() => {
            mapData();
        }); 
    })
}