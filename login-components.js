import {loginUser, registerUser, } from "./api.js";
import { getFetchPromice } from "./main.js";
export function renderLoginComponent({ comments, appEl, setToken,setName, getApp}) {
    let isLoginMode = true;
    const commentsHtmlNotEdit = comments.map((comment, index) => {   
        return `<li class="comment" data-index='${index}'>
        <div class="comment-header" data-index="${index}">
          <div>${comment.name}</div>
          <div>${comment.dateСreation}</div>
        </div>
        <div class="comment-body">
        <div data-index="${index}" class="comment-text" >
        ${comment.text}
      </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesNumber}</span>
             <button data-index= '${index}'  class='${comment.colorLikes}'></button> 
          </div>
        </div>
      </li>`;
    }).join("");
    const appHTML = `<div class="container">
      <ul class="comments">
       ${commentsHtmlNotEdit}
      </ul>  
      <div>Чтобы добавить комментарий, <a  id="login-link" class="form-link" href="#">авторизуйтесь</a></div>
      </div>`;
      console.log (commentsHtmlNotEdit);
        appEl.innerHTML = appHTML;
      

    document.getElementById('login-link').addEventListener('click', () => {
    const renderForm = () => {
        const appHtml =
         `<div class="container">
        <div class="form-add-login">
          <h3 class= "form-title"> Форма ${isLoginMode ? "входа" :"регистрации" } </h3>
          <div class="form-row">
         
          ${isLoginMode ? "" : ` <input type="text" id="name-input" class ="input" placeholder ="Имя" />`}
          <br>
       
         <input type="text" id="login-input"  class ="input" placeholder ="Введите логин"/>
         <br>
         
         <input type="password" id="password-input"  class ="input" placeholder ="Введите пароль"/> 
         </div>
               <button class="add-form-button" id="login-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться' }</button> 
               <a  class="register-link" href="#">${isLoginMode ? "Зарегистрироваться" : "Войти"}</a>  
             </div>
           </div>`;
        appEl.innerHTML = appHtml;
      
        document.querySelector('.register-link').addEventListener('click', ()=> {
            isLoginMode = !isLoginMode;
            renderForm();
         });

        document.getElementById ('login-button').addEventListener ('click', ()=>{
            if (isLoginMode) {
                const login = document.getElementById ('login-input').value;
                const password = document.getElementById ('password-input').value;
            //    setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
               
               if (!login) {
                   alert ('Введите логин');
                   return;
               }
               
               if (!password) {
                   alert ('Введите пароль');
                   return;
               }
  
               


         loginUser({
             login:login,
             password:password,
         }).then((user)=>{
         
         setToken(`Bearer ${user.user.token}`);
         setName(user.user.name)
         getFetchPromice();
         }).catch (error =>{
          if (error.message === "Сервер сломался") {
              alert("Сервер сломался, попробуйте позже");
              getAPI();
            } else if (error.message === "Нет авторизации") {          
                alert(error.message);
              } else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
                console.log(error);
              }
         });
      } else {
       
          const login = document.getElementById ('login-input').value;
          const name = document.getElementById ('name-input').value;
          const password = document.getElementById ('password-input').value;
      //    setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
         
         if (!name) {
          alert ('Введите имя');
          return;
      }
         if (!login) {
             alert ('Введите логин');
             return;
         }
         
         if (!password) {
             alert ('Введите пароль');
            //  return;
         }
         registerUser({
          login:login,
          password:password,
          name:name,
      }).then((user)=>{
      
  setToken(`Bearer ${user.user.token}`);
     getFetchPromice();
      }).catch((error)=>{
          if (error.message === "Сервер сломался") {
              alert("Сервер сломался, попробуйте позже");
              getAPI();
            } else if (error.message === "Нет авторизации") {          
                alert(error.message);
              } else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
                console.log(error);
              }
      });
  }; 
  // document.getElementById ('toggle-button').addEventListener ('click', ()=>{
  //     isLoginMode = !isLoginMode;
  //     renderForm();
  // });
});
    }
renderForm();
});
}