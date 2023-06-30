import { loginUser, registerUser } from "../api.js";

export function renderLoginComponent({appEL, setToken,getArr}) {
    const appHtml = `
    <div class="login-form" id="enter-form">
    Форма входа
    <br>
    <input type="text" class="login-form-input" placeholder="Введите логин" id="enter-form-login" />
    <input type="password" class="login-form-input" placeholder="Введите пароль" id="enter-form-password" />
    <div class="login-form-row">
      <button class="login-form-button" id="enter-button-enter">Войти</button>
      <button class="login-form-button-reg" id="enter-button-reg">Зарегистрироваться</button>
    </div>
    </div>
    `;
            appEL.innerHTML = appHtml;
            const enterButton = document.getElementById("enter-button-enter");
            console.log(enterButton);
            enterButton.addEventListener("click", () => {
                console.log("всё работает");
                setToken ("Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck");

                loginUser({
                    login: "glebka",
                    password: "123456",
                  })
                  .then ((user) => {
                    console.log(user);
                    setToken(`Bearer ${user.user.token}`);
                    getArr();
                  })
                
            });
}