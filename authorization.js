const startAuthorizationElement = document.getElementById("start-authorization");
const authorizationInvisibleElement = document.getElementById("authorization-invisible");
const addFormInvisibleElement = document.getElementById("add-form-invisible");




export function authorization() {
    const formAuthorizationElement = document.getElementById("form-authorization");
    const authorizationFormHtml = `<div class="add-form authorization" id="">
      <p class="authorization">Форма входа</p>
      <input type="text" class="add-form-text" id="" placeholder="Введите ваше имя (не менее 3-х знаков)" />
      <input type="text" class="add-form-text" id="" placeholder="Введите ваш логин (не менее 3-х знаков)" />
      <button class="add-form-button" id="authorization-button">Войти</button>
      <p class="authorization">Зарегистрироваться</p>
    </div>`;
    ;
    formAuthorizationElement.innerHTML = authorizationFormHtml;
    authorizationInvisibleElement.classList.add("loading-none");
    addFormInvisibleElement.classList.add("loading-none");
}
startAuthorizationElement.addEventListener('click', authorization);




