export function renderLoginComponent({ appEl, setToken, fetchGet }) {
        const appHtml = `
        <div class="container">
          <div class="add-form">
            <h3 class="form-title">Форма входа</h3>
            <div class="form-row">
              Логин    
              <input id="login-input" type="text" class="add-form-name"/>
              <br />
              <br />
              Пароль
              <input id="login-input" type="text" class="add-form-name"/>
            </div>
            <br />
            <button id='login-button' class="add-form-button">Войти</button>
        </div>`
          
        appEl.innerHTML = appHtml;

        
        document.getElementById("login-button").addEventListener("click", () => {
            
            setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
            fetchGet();
            //renderApp();
        })
    
};
