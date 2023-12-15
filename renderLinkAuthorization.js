// import { renderForm } from "./renderForm";
// import { login, setToken } from "./api.js";

// export const userName = {
//     value: null,
//     set: (name) => { userName.value = name; },
//     get: () => { return userName.value; }
// };
// export function renderLinkAuthorization  (message, isLoading ) {
//     const form = document.querySelector('.add-form');
//     const linkHtml = `
//       <button type = "button" id = "auth_btn">Авторизоваться</button>
//     `;
//     form.innerHTML = linkHtml;
//     const authBtnElement = document.getElementById('auth_btn');
  
//     authBtnElement.addEventListener('click', () => {
//       const loginHtml = `
//       <h1>Авторизация</h1>
//       <input type="text" name="" id="login-input" placeholder="Логин">
//       <input type="text" name="" id="password-input" placeholder="Пароль">
//       <button type="button" id = "login-btn">Войти</button>
//       `;
//       form.innerHTML = loginHtml;

//       const loginBtn = document.getElementById('login-btn');
  
//       loginBtn.addEventListener('click', () => {
//         const loginInputElement = document.getElementById('login-input');
//         const passwordInputElement = document.getElementById('password-input');
//         login({
//           login: loginInputElement.value,
//           password: passwordInputElement.value,
//         })
//           .then((responseData) => {
//               setToken(responseData.user.token);
//               userName.set(responseData.user.name);
//           })
//           .then(() => {
//             renderForm(message, isLoading);
//           })
//       })
  
      
//     })
// }