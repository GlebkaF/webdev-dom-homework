import { loginUser, registerUser } from '../api.js'

export function renderLoginComponent({ appEl, setToken, fetchGet }) {
    let isLoginMode = true;

    const renderForm = () => {
            const appHtml = `
            <div class="container">
            <div class="add-form">
            <h3 class="form-title">Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
            <div class="form-row">
                ${
                    isLoginMode 
                    ? '' 
                    : `
                    Имя
              <input id="name-input" type="text" class="add-form-name"/>
              <br /><br />`
            }
              
              Логин    
              <input id="login-input" type="text" class="add-form-name"/>
              <br />
              <br />
              Пароль
              <input id="password-input" type="password" class="add-form-name"/>
            </div>
            <br />
            <button id='login-button' class="add-form-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
            <br /><br /><br />
            <button id='toggle-button' class="add-form-button">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}</button>
        </div>
        `;
        appEl.innerHTML = appHtml;
        document.getElementById("login-button").addEventListener("click", () => {
            if(isLoginMode) {
                const login = document.getElementById("login-input").value;
                const password = document.getElementById("password-input").value;

                if(!login) {
                    alert('Введите логин')
                    return;
                }
                if(!password) {
                    alert('Введите пароль')
                    return;
                }
                //setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");

                loginUser({
                    login: login,
                    password: password
                }).then((user) => {
                    //console.log(user);
                    setToken(`Bearer ${user.user.token}`);
                    fetchGet();
                }).catch(error => {
                    alert(error.message);
                });
            } else {
                //alert('Заглушка регистрации');
                const login = document.getElementById("login-input").value;
                const name = document.getElementById("name-input").value;
                const password = document.getElementById("password-input").value;

                if(!name) {
                    alert('Введите имя')
                    return;
                }
                
                if(!login) {
                    alert('Введите логин')
                    return;
                }
                if(!password) {
                    alert('Введите пароль')
                    return;
                }
                //setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");

                registerUser({
                    login: login,
                    password: password,
                    name: name
                }).then((user) => {
                    //console.log(user);
                    setToken(`Bearer ${user.user.token}`);
                    fetchGet();
                }).catch(error => {
                    alert(error.message);
                });
            }
            
            
            
            //renderApp();
        });

        document.getElementById("toggle-button").addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            renderForm();

        });
    };
    renderForm();
}



    
      
        

        
       

 