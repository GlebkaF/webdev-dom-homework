import { renderAll } from "./main.js";

export const renderText = () => {
    const appElement = document.getElementById("app");
      const form = `
      <div class="add-form" id="input-form">
      Чтобы добавить комментарий, <a href="#" id="login-link">авторизуйтесь</a>
    </div>
    `
    appElement.innerHTML = form;
    
    const linkElement = document.getElementById("login-link");
    linkElement.addEventListener("click", () => {
        renderAll('auth')
    });
  }