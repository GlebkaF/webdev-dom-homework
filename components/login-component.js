import { loginUser, registerUser } from "../API.js";

export function renderLoginComponent({comments, appEl, setToken, getFetchFunction}) {
    let isLoginMode = true;
 
    const commentsHtmlNotEdit = comments.map((comment, index) => {
  
        return `<li class="comment" data-index="${index}">
          <div class="comment-header" data-index="${index}">
            <div>${comment.name}
            </div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div data-index="${index}" class="comment-text" >
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter"> ${comment.likes}</span>
              <button data-index="${index}" class='${comment.propertyColorLike}'></button>
            </div>
          </div>
        </li>`;
        }).join("");

      const appHTML = `<div class="container">

      <ul class="comments">
       ${commentsHtmlNotEdit}
      </ul> <br>   
      <div>Чтобы добавить комментарий, <a  id="login-link" class="form-link" href="#">авторизуйтесь</a></div>
      </div>`;
    
      appEl.innerHTML = appHTML;

      document.getElementById('login-link').addEventListener('click', () => {
        const renderForm = () =>{
            const appHtml =
            `<div class="container">
            <div class="add-form">
            <h3 class="add-form-title">Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
            ${isLoginMode ? '' : 
            `<input
                type="text"
                id ="name-input"
                class="add-form-name_regist"
                placeholder="Введите имя"
            /><br>`}
            
            <input
                type="text"
                id ="login-input"
                class="add-form-login"
                placeholder="Введите логин"
            /><br>
    
            <input
                type="password"
                id ="password-input"
                class="add-form-password"
                placeholder="Введите пароль"
            />
            <div class="add-form-login_button">
                <button id = "login-button" class="add-form-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
                <button id = "toggle-button" class="add-form-button_regist">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}</button>
            </div>
            </div>`;
    
            appEl.innerHTML = appHtml;
            
            document.getElementById('login-button').addEventListener('click', () => {
    
                if (isLoginMode) {
                    const login = document.getElementById('login-input').value;
                    const password = document.getElementById('password-input').value;
        
                    if (!login) {
                        alert("Введите логин");
                        return;
                    }
                
                    if (!password) {
                        alert("Введите пароль");
                        return;
                    }
                
                    loginUser({
                        login: login,
                        password: password,
                    })
                    .then((user) => {
                        setToken(`Bearer ${user.user.token}`);
                        getFetchFunction();
                    })
                    .catch((error) => {
                        // TODO: Выводить алерт красиво
                        alert(error.message);
                    }); 
                } else {
                    const nameInputElement = document.getElementById('name-input').value;
                    const login = document.getElementById('login-input').value;
                    const password = document.getElementById('password-input').value;
        
                    if (!nameInputElement) {
                        alert("Введите имя");
                        return;
                    }
    
                    if (!login) {
                        alert("Введите логин");
                        return;
                    }
                    
                    if (!password) {
                        alert("Введите пароль");
                        return;
                    }
                
                    registerUser({
                        name: nameInputElement,
                        login: login,
                        password: password,
                    })
                    .then((user) => {
                        setToken(`Bearer ${user.user.token}`);
                        getFetchFunction();
                    })
                    .catch((error) => {
                        // TODO: Выводить алерт красиво
                        alert(error.message);
                    });   
                }
                
            });
    
            document.getElementById('toggle-button').addEventListener('click', () => {
                isLoginMode = !isLoginMode;
                renderForm();
            });
        };
        
        renderForm();
      }) ;
    
}

 

