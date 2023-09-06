import { renderAllComments, fetchGet } from './main.js';
import { getTodos, postTodo, login, token, setToken, UserName, setUserName, UserRegistration } from './api.js';


export const renderComments = ({ comments }) => {
  let commentsElement = document.getElementById("comments");
  const newComments = comments.map((comment, index) => {
    return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
          ${comment.quote ? `<div class=quote> ${quote}</div>` : ""}
          ${comment.changeButton ?
        `<textarea
            tipe = "textarea"
            class = "change-form-text"
            rows = 3
            autofocus> ${comment.text}</textarea>`
        : `<div class="comment-body"  data-text="${comment.text}" data-name="${comment.name}">
                <div class="comment-text">
                  ${comment.text}
                </div>
              </div>`}
        <div class="comment-footer">
          ${comment.changeButton
        ? `<button class="save-comment-button" data-index="${index}">Сохранить</button>`
        : `<button class="change-comment-button" data-index="${index}">Изменить</button>`}
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class='${comment.isLiked ? "like-button -active-like" : "like-button"}'></button>
          </div>
        </div>
      </li>`;
  }).join('');
  commentsElement.innerHTML = newComments;

}
let addForm = document.getElementById("form")

const appForm = `
  <div class="add-form" id="add-form">
    <input 
      id="add-form-name" 
      type="text" 
      class="add-form-name" 
      readonly="readonly"
    />
    <textarea 
      id="add-form-text" 
      type="textarea" 
      class="add-form-text " 
      placeholder="Введите ваш коментарий"
      rows="4">
    </textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="add-form-button">Написать</button>
    </div>
  </div>`;

addForm.innerHTML = appForm;
addForm.classList.add('none');

const addFormButtonElement = document.getElementById("add-form-button");
const nameInputElement = document.getElementById("add-form-name");
const textInputElement = document.getElementById("add-form-text");
const deleteCommentButton = document.getElementById("delete-comment-button");
const loadingForm = document.getElementById("loadingForm");


const addNewComment = () => {

  textInputElement.classList.remove("emptyTextName");
  nameInputElement.classList.remove("emptyTextName");
  const validation = () => {
    if (nameInputElement.value.length < 3) {
      nameInputElement.classList.add("emptyTextName");
    };
    if (textInputElement.value.length < 3) {
      textInputElement.classList.add("emptyTextName");
    };
  }

  validation();
  addForm.disabled = true;
  addForm.classList.add('none');
  loadingForm.textContent = 'Комментарий добавляется...';

  const post = (text) => {
    postTodo({
      name: nameInputElement.value,
      text: textInputElement.value
    })
      .then((responseData) => {
        return fetchGet();
      })
      .then(() => {
        loadingForm.textContent = '';
        addForm.classList.remove('none');
        textInputElement.value = "";
        nameInputElement.value = "";
      }).catch((error) => {
        if (error.message === "Сервер упал") {
          // Пробуем снова, если сервер сломался
          post(text);
        };
        if (window.navigator.onLine === false) {
          alert('Проблемы с интернетом, проверьте подключение')
        };
        // console.warn(error);
        loadingForm.textContent = '';
        addForm.classList.remove('none');
      });
  }

  post();

  renderAllComments();
}

addFormButtonElement.addEventListener("click", addNewComment);

const authorization = document.getElementById('authorization');
const registration = document.getElementById('registration');
const goAuthorizationButton = document.getElementById("go-authorization-button");
const deleteCommentButtonDown = document.getElementById('delete-comment-button');

deleteCommentButtonDown.classList.add('none');

const addAutorization = `    
    <div class="authorization-form" id="authorization-form">
    <div class="authorization-form-title">Форма входа</div>
    <input id="authorization-form-login" type="text" class="authorization-form-login" placeholder="Введите логин" />
    <input id="authorization-form-password" type="text" class="authorization-form-password"
      placeholder="Введите пароль" />
    <div class="authorization-form-row">
      <button class="authorization-form-button" id="authorization-form-button">Войти</button>
      <button class="authorization-form-button2" id="authorization-form-button2">Зарегистрироваться</button>
    </div>
  </div>`;
authorization.innerHTML = addAutorization;
authorization.classList.add('none');

const addRegistration = `
  <div class="registration-form" id="registration-form">
  <div class="registration-form-title">Форма входа</div>
  <input id="registration-form-login" type="text" class="registration-form-login" placeholder="Введите логин" />
  <input id="registration-form-name" type="text" class="registration-form-name" placeholder="Введите имя" />
  <input id="registration-form-password" type="text" class="registration-form-password"
    placeholder="Введите пароль" />
  <div class="registration-form-row">
    <button class="registration-form-button" id="registration-form-button">Зарегистрироваться</button>
    <button class="registration-form-button2" id="registration-form-button2">Войти</button>
  </div>
  </div>
  `;

registration.innerHTML = addRegistration;
registration.classList.add('none');


const autor = () => {

  const authorizationFormButton2 = document.getElementById('authorization-form-button2');
  const registrationFormButton2 = document.getElementById('registration-form-button2');
  const authorizationFormButton = document.getElementById('authorization-form-button');
  const registrationFormButton = document.getElementById('registration-form-button');
  const authorizationFormLogin = document.getElementById('authorization-form-login');
  const authorizationFormPassword = document.getElementById('authorization-form-password');
  const registrationFormLogin = document.getElementById('registration-form-login');
  const registrationFormName = document.getElementById('registration-form-name');
  const registrationFormPassword = document.getElementById('registration-form-password');


  authorizationFormButton.addEventListener("click", () => { //Клик на вход в форме авторизации
    login({
      login: authorizationFormLogin.value,
      password: authorizationFormPassword.value,
    }).then((responseData) => {
      console.log(token);
      setToken(responseData.user.token)
      setUserName(responseData.user.name)
      nameInputElement.value = UserName;
      console.log(UserName);
      authorization.classList.add('none');
      commentsElement.classList.remove('none');
      addForm.classList.remove('none');
      deleteCommentButtonDown.classList.remove('none');
    }).catch((error) => {
      if (error.message === "Не верный логин или пароль") {
        alert("Введен не верный логин или пароль")
        return;
      }
    });
  });

  authorizationFormButton2.addEventListener("click", () => { //Клик на зарегистрироваться в форме авторизации
    console.log('g');
    registration.classList.remove('none');
    authorization.classList.add('none');

    registrationFormButton2.addEventListener("click", () => { //Клик на вход в форме регистрации
      authorization.classList.remove('none');
      registration.classList.add('none');
      console.log('i');
    });

    registrationFormButton.addEventListener("click", () => { //Клик на регистрации в форме регистрации
      UserRegistration({
        login: registrationFormLogin.value,
        name: registrationFormName.value,
        password: registrationFormPassword.value,
      }).then((responseData) => {
        setToken(responseData.user.token)
        setUserName(responseData.user.name)
        nameInputElement.value = UserName;
        registration.classList.add('none');
        commentsElement.classList.remove('none');
        addForm.classList.remove('none');
        deleteCommentButtonDown.classList.remove('none');  
      }).catch((error) => {
        if (error.message === "Повторяется имя") {
          alert("Повторяется имя")
          return;
        }
      })
    });
  })
}


let commentsElement = document.getElementById("comments");

goAuthorizationButton.addEventListener("click", () => {
  const goAuthorizationText = document.getElementById('go-authorization-text');
  goAuthorizationText.classList.add('none');
  commentsElement.classList.add('none');
  authorization.classList.remove('none');
  autor();
})

addFormButtonElement.classList.add("empty");
addFormButtonElement.disabled = true;

const check = (elem) => {
  elem.addEventListener('input', () => {
    if (textInputElement.value === "" || nameInputElement.value === "") {
      addFormButtonElement.classList.add("empty");
      addFormButtonElement.disabled = true;
    } else {
      addFormButtonElement.classList.remove("empty");
      addFormButtonElement.disabled = false;
    }
  });
}

check(textInputElement)
check(nameInputElement)

nameInputElement.addEventListener('input', () => {
  if (nameInputElement.value !== "") {
    nameInputElement.classList.remove("emptyTextName");
  }
});

textInputElement.addEventListener('input', () => {
  if (textInputElement.value !== "") {
    textInputElement.classList.remove("emptyTextName");
  }
});

form.addEventListener("keyup", (e) => {
  if (e.code === "Enter") addNewComment();
});

deleteCommentButton.addEventListener('click', () => {
  comments.pop();
  renderAllComments();
});


  // goAuthorizationButton.addEventListener("click", () => {
  //   console.log('k');
  // }
  // )
