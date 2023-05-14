export function renderLoginComponent(element, commentsHtml) {
    const containerHtml = ` <ul id="list-comments" class="comments">
    <!--Рендерится из JS-->
    ${commentsHtml}
    </ul> 
    <div class="authorization">
      <h3 class="authorization__title">Форма входа</h3>
      <input
        id="authorization__login"
        type="text"
        class="authorization__login"
        placeholder="Логин"
      />
      <input
        id="authorization__password"
        type="password"
        class="authorization__password"
        placeholder="Пароль"
        rows="1"
      ></input>
      <div class="authorization__button">
        <button id="authorization__button" class="add-form-button">Войти</button>
        <button id = "authorization_registr" class = "registr-form-button">Зарегистрироваться</button>
      </div>
    </div>`
    element.innerHTML = containerHtml;
}
export function renderAddFormComponent (element, commentsHtml) {
    const containerHtml = ` <ul id="list-comments" class="comments">
<!--Рендерится из JS-->
${commentsHtml}
</ul>
<div class="add-form">
  <input
    id="input-name"
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
  />
  <textarea
    id="add-text"
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш коментарий"
    rows="4"
  ></textarea>
  <div class="add-form-row">
    <button id="add-button" class="add-form-button">Написать</button>
  </div>
</div>` 
element.innerHTML = containerHtml;
} 
export function renderRegFormComponent (element, commentsHtml) {
    const containerHtml = ` <ul id="list-comments" class="comments">
    <!--Рендерится из JS-->
    ${commentsHtml}
    </ul> 
    <div class="registr">
      <h3 class="registr__title">Форма регистрации </h3>
      <input
      id="authorization__name"
      type="text"
      class="registr__name"
      placeholder="Имя"
    />
      <input
        id="authorization__login"
        type="text"
        class="registr__login"
        placeholder="Логин"
      />
      <input
        id="authorization__password"
        type="password"
        class="registr__password"
        placeholder="Пароль"
        rows="1"
      ></input>
      <div class="registr__buttons">
      <button id="registr__authorization" class="add-form-button">Войти</button>
      <button id = "registr__button" class = "registr-form-button">Зарегистрироваться</button>
      </div>
    </div>`
    element.innerHTML = containerHtml;
}
export function renderMainRegFormComponent (element, commentsHtml) {
  const containerHtml = ` <ul id="list-comments" class="comments">
  <!--Рендерится из JS-->
  ${commentsHtml}
  </ul> 
  <div class="registr">
   <p>Что бы добавить комментарий, <span class = "main__authorization" id = "main__authorization">авторизуйтесь</span></p>
  </div>`
  element.innerHTML = containerHtml;
}