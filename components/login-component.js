   export function renderLoginComponent({ appEl, commentHtml, setToken, getFetchPromise }) {
    const appHtml = `
    <section id="loaderComments" class="loader -display-none">
    <h4 id="loaderText" class="text-loader">Комментарии загружаются...</h4>
    </section>
    <div class="container">
    <ul class="comments">
    <!-- список рендерится из js !!!!!!!-->
    ${commentHtml}
    </ul>
  
    <div class="add-form add-form--register">
      <h3>Чтобы добавить комментарий, авторизируйтесь</h3>
      <input
        type="text"
        class="add-form-login"
        placeholder="Введите логин"
        value=""
      />
      <input
        type="password"
        class="add-form-password"
        placeholder="Введите пароль"
        rows="4"
        value = ""
      ></input>
      <div class="add-form-row">
      <button class="login-form-button">Войти</button>
      </div>
    </div>`;

    appEl.innerHTML = appHtml;

    document.querySelector('.login-form-button').addEventListener('click', () => {
      setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k")
      getFetchPromise();
      //renderComments();
    })
   }