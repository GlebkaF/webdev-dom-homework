import { login, setUserName } from "./API.js";
import { setToken } from "./main.js";
import { renderData } from "./render.js";

export function renderLogin() {
  const appHtml = document.getElementById("app");
  appHtml.innerHTML = `<div class = "formAvtorization" >
   <p> Страница авторизации</p>
   <input placeholder="Имя" class = "inputLog inputLogin"></input>
   <input placeholder="Пароль" class = "inputLog inputPassword"></input>
   <button class = "buttonLog">Авторизоваться</button>
    </div>`;
    const loginBtn = document.querySelector(".buttonLog")
    loginBtn.addEventListener("click",()=>{
    const inputLogin =document.querySelector(".inputLogin");
    const inputPassword =document.querySelector(".inputPassword");
    login(inputLogin.value,inputPassword.value)
    .then((res)=>{
      setToken(res.user.token)
      setUserName(res.user.login)
      renderData()
    })
    })
}

