export const standardForm = `        
<div class="add-form" id="form">
<input id="userName"
  type="text"
  class="add-form-name"
  placeholder="Введите ваше имя"
/>
<textarea id="userComment"
  type="textarea"
  class="add-form-text"
  placeholder="Введите ваш коментарий"
  rows="4"
></textarea>
<div class="add-form-row">
<button id="addComment" class="add-form-button">Написать</button>
<button id="exit" class="exit-button">Выход</button>
</div>
</div>`;
export const notRegForm = `<span>Чтобы добавить коментарий, <a class="enter-form-authorization">авторизутесь</a></span>`;
export const enterForm = `        
<div class="add-form" id="form">
<input id="userLogin"
  type="text"
  class="add-form-login"
  placeholder="Введите ваш логин"
/>
<input id="userPassword"
  type="password"
  class="add-form-password"
  placeholder="Введите ваш пароль"
></input>
<div class="add-form-row">
  <button class="enter-form-button">Войти</button>
</div>
<a class="switch-to-reg-form">Регистрация</a>
</div>`;
export const regForm = `          
<div class="add-form" id="form">
<input id="userName"
type="text"
class="add-form-nameReg"
placeholder="Введите ваше имя"
/>
<input id="userLogin"
type="text"
class="add-form-login"
placeholder="Введите ваш логин"
/>
<input id="userPassword"
type="password"
class="add-form-password"
placeholder="Введите ваш пароль"
></input>
<div class="add-form-row">
<button class="reg-form-button">Зарегистрироваться</button>
</div>
<a class="enter-form-authorization">Войти</a>
</div>`;