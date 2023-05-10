const appEl = document.querySelector(".container");
export let isLogin = true;
export function renderLogin({appEl}) {
  const appEnter = 
`<div class="add-form">
<h1 class = "form-enter">Форма ${isLogin ? 'входа' : 'регистрации'}</h1>
${isLogin ? '' : `<input
type="text"
class="add-form-name"
placeholder="Введите имя"
/>`}
  <input
    type="text"
    class="add-form-login"
    placeholder="Введите логин"
  />
  <input
    type="password"
    class="add-form-password"
    placeholder="Введите пароль"
  />
  <div class="add-form-row">
    <button class="form-button-enter">${isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
  </div>
  <div class="add-form-row">
  <button class="toggle-button-enter">Перейти ${isLogin ? 'к регистрации' : 'ко входу'}</button>
</div>
</div>`;
appEl.innerHTML = appEnter;

document.querySelector(".toggle-button-enter").addEventListener('click', () => {
  isLogin = !isLogin;
  renderLogin({appEl});
  });
};
