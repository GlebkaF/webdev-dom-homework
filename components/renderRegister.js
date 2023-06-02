export function renderRegister({ appElement }) {
    let isAuthMode = true;

    const renderForm = () => {
        appElement.innerHTML = `
            <div class="add-form form-pos">
                <h2 class="form-title">
                    ${isAuthMode ? 'Вход' : 'Регистрация'}
                </h2>
                <input
                    type="text"
                    class="reg-form-inp"
                    id="reg-login"
                    placeholder="Введите логин" />
                <input
                    type="password"
                    class="reg-form-inp"
                    id="reg-password"
                    placeholder="Введите пароль" />
                <button class="add-form-button" id="log-in">
                    ${isAuthMode ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </div>
            <p class="bottom-text">Перейти ${isAuthMode ? 'к' : 'ко'} 
                <a href="" id="reg-auth-link" class="link">
                    ${isAuthMode ? 'регистрации' : 'входу'}
                </a>
            </p>`;
        
        document.querySelector('#reg-auth-link')
        .addEventListener('click', (event) => {
            event.preventDefault();
            
            isAuthMode = !isAuthMode;

            renderForm();
        });
    }

    renderForm();
}