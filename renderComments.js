// В этом модуле размещаем только то что связано с отрисовкой приложения
import { users } from "./main.js";
import { addTodo } from "./api.js";
import { renderLoginComponent } from "./login.js";

export let token = "Bearer coascsbkbob46g5g5k5o5s5w606g39c3b43ds3c03bk";
token = null;

const formComments = `
<div class="container">
  <div class="add-form" id="addForm">
    <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="enter-name" />
    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4" id="enter-comment"></textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="btn">Написать</button>
    </div>
  </div>
</div>
`;

export const renderUserComments = () => {
  const appEl = document.getElementById("app"); // Объявили константу в которую будет загружаться конечный код

  if (!token) {
    const userHtml = users.map((user, index) => { // С помощью метода .map проходимся по всему массиву users 

      return `<li class="comment">
          <div class="comment-header">
            <div class="comment-name">${user.name}</div>  
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${user.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.likes}</span>
              <button data-index="${index}" class='like-button ${user.colorLike}'></button>
            </div>
          </div>
        </li><br>`;
    }).join(''); // join() все элементы массива объединяет в одно строковое значение, убирая все разделители за счет кавычек (''), 
    // если скобки пустые то разделение произойдет по умолчанию с помощью запятой, рендер комментариев закончен

    appEl.innerHTML = userHtml + `<p> Что бы добавить комментарий <a href="#" id="authorisation">авторизуйтесь</a> </p>`; // Меняем содержимое HTML элемента с id appEl и заливаем в нее весь код который имеет константа userHtml
    document.getElementById("authorisation").addEventListener('click', () => {
      renderLoginComponent({
        setToken: (newToken) => {
          token = newToken;
        },
        // fetchTodosAndRender,
      });
    })

  } else {
    const userHtml = users.map((user, index) => {
      return `<li class="comment">
          <div class="comment-header">
            <div class="comment-name">${user.name}</div>  
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${user.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.likes}</span>
              <button data-index="${index}" class='like-button ${user.colorLike}'></button>
            </div>
          </div>
        </li><br>`;
    }).join(''); // join() все элементы массива объединяет в одно строковое значение, убирая все разделители за счет кавычек (''), 
    // если скобки пустые то разделение произойдет по умолчанию с помощью запятой, рендер комментариев закончен

    appEl.innerHTML = userHtml + formComments;
    formCommentsListener();
  }
};

const formCommentsListener = () => {

  const enterNameElement = document.getElementById("enter-name")
  const enterCommentElement = document.getElementById("enter-comment")
  const buttonElement = document.getElementById("btn")
  const addFormElement = document.getElementById("addForm")

  //   Добавляем комментарий кнопкой написать
  buttonElement.addEventListener("click", () => { // Добавляем обрабочтик кликов на элемент buttonElement
    enterNameElement.classList.remove('error'); // Удалем класс error который навешивается при пустом инпуте
    if (enterNameElement.value === "") { // если элемент enterNameElement будет равняться пустоте то выполняем действие ниже
      enterNameElement.classList.add('error'); // Подсвечивает поле Name если оно пусто. С помощью classList мы добавляем класс error
      return; // прекращаем выполнения кода который идет ниже
    }
    enterCommentElement.classList.remove('error'); // Удалем класс error который навешивается при пустом инпуте
    if (enterCommentElement.value === "") { // если элемент enterCommentElement будет равняться пустоте то выполняем действие ниже
      enterCommentElement.classList.add('error'); // Подсвечивает поле коммента если оно пусто. С помощью classList мы добавляем класс error
      return; // прекращаем выполнения кода который идет ниже
    }

    addFormElement.classList.add('hidden') // установить невидимость 

    // Добавляем коммент и имя в API с помошью метода POST
    // переехало в api.js
    addTodo({ token });

    addFormElement.classList.remove('hidden') // убрать невидимость
  });
}

