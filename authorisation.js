import { userAuthorization,userRegistration } from "./api.js";
 export let name;

 export function renderLogin({ appEl, setToken, getFetch}) {
   let isLoginMode = true;


   const renderForm = () => {
     const appHtml = `
       <div class="login-form">
       <h3 class="login-form-heading"> ${isLoginMode ? "Войти" : "Зарегистрироваться"}</h3>
       ${
         isLoginMode
           ? ""
           : `
             <input type="text" id="name-input" class="form-login" placeholder="Введите имя"/>`
       }
           
           <input type="text" id="login-input" class="form-login" placeholder="Введите логин"/>
           <input type="password" id="password-input" class="form-password" placeholder="Введите пароль"/>
       
         <button class="login-form-button" id="login-button">${
           isLoginMode ? "Вход" : "Регистрация"
         }</button>

         <button class="login-form-button" id="toggle-button">${
           isLoginMode ? "Регистрация" : "Вход"
         }</button>
   `;

     appEl.innerHTML = appHtml;


     document.getElementById("login-button").addEventListener("click", () => {
       if (isLoginMode) {
         const login = document.getElementById("login-input");
         const password = document.getElementById("password-input");

         login.classList.remove("error");
         password.classList.remove("error");

         if (login.value === "" ||  password.value === "") {
           if (login.value === "") {
             login.classList.add("error");
           }
           if ( password.value === "") {
             password.classList.add("error");
           }

           return;
         }

         userAuthorization({
           login: login.value,
           password: password.value,
         })
           .then((user) => {
             setToken(`Bearer ${user.user.token}`);
             name = user.user.name;
             getFetch();
           })
           .catch((error) => {
             alert(error.message);
           });
       } else {
         const login = document.getElementById("login-input");
         const name = document.getElementById("name-input");
         const password = document.getElementById("password-input");

         login.classList.remove("error");
         password.classList.remove("error");
         name.classList.remove("error");
         if (login.value === "" ||  password.value ==="" || name.value === "") {
           if (login.value === "") {
             login.classList.add("error");
           }
           if ( password.value === "") {
             password.classList.add("error");
           }
           if (name.value === "") {
             name.classList.add("error");
           }
           return;
         }
         userRegistration({
           login: login.value,
           password: password.value,
           name: name.value,
         })
           .then((user) => {
             setToken(`Bearer ${user.user.token}`);
             getFetch();
           })
           .catch((error) => {
             alert(error.message);
           });
       }
     });

     document.getElementById("toggle-button").addEventListener("click", () => {
       isLoginMode = !isLoginMode;
       renderForm();
     });
   };

   renderForm();
 } 