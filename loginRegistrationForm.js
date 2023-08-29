import { loginUser } from "./api.js";
import { registerUser } from "./api.js";

let isLoginMode = true;
const form = document.querySelector("form");

const renderForm = () => {
    const appHTML = `<div class="login-container"><div class="authorization-form">
    <h2>ФОРМА ${isLoginMode ? "ВХОДА" : "РЕГИСТРАЦИИ"}</h2>
    <div class="input-container"> ${isLoginMode ? "" : `ИМЯ <input type="text" id="username" class="input-group"/>
    <br />`}
    ЛОГИН <input type="text" id="user-login" class="input-group"/>
    <br />
    ПАРОЛЬ <input type="password" id="user-password" class="input-group" />
    <br />
    </div>
    <div class="#">
    <button class="btn" id="button">${isLoginMode ? "РЕГИСТРАЦИЯ" : "ВХОД"}</button>
    </div>
    </div>
    </div>`;
    
}


      
      
        