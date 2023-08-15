export let token;
export let userName;
import { comments } from "./main.js";
import _ from 'lodash'

export function getFetch() {
  return fetch("https://wedev-api.sky.pro/api/v2/arseny-kulikov/comments", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).catch((error) => {
    throw new Error(`Кажется, у вас сломался интернет, попробуйте позже...`);
  });
}
export function postFetch() {
  const addFormButtonIdNew = document.getElementById(
    `add-form-buttonListIdNew`
  );
  //const listButton = document.getElementById(`add-form-buttonListId`);
  return fetch("https://wedev-api.sky.pro/api/v2/arseny-kulikov/comments", {
    method: "POST",
    body: JSON.stringify({
      text: commentTextNew.value
        .replaceAll("QUOTE_BEGIN", "<textarea>")
        .replaceAll("QUOTE_END", "</textarea><br>"),
      name: commentNameNew.value,
      //forceError: true,
    }),
    headers: { Authorization: `Bearer ${token}` },
  }).catch((error) => {
    addFormButtonIdNew.disabled = false;
    throw new Error(`Кажется, у вас сломался интернет, попробуйте позже...`);
  });
}
export function postFetchFirst() {
  //const addFormButtonIdNew = document.getElementById(`add-form-buttonListIdNew`);
  const listButton = document.getElementById(`add-form-buttonListId`);
  return fetch("https://wedev-api.sky.pro/api/v2/arseny-kulikov/comments", {
    method: "POST",
    body: JSON.stringify({
      text: commentText.value
        .replaceAll("QUOTE_BEGIN", "<textarea>")
        .replaceAll("QUOTE_END", "</textarea><br>"),
      name: commentName.value,
      forceError: true,
    }),
    headers: { Authorization: `Bearer ${token}` },
  }).catch((error) => {
    //addFormButtonIdNew.disabled = false;
    listButton.disabled = false;
    throw new Error(`Кажется, у вас сломался интернет, попробуйте позже...`);
  });
}
//вход по логину
function loginFetch() {
  const loginForm = document.getElementById(`login-formListId`);
  const loginLogin = document.getElementById(`autorizationLogin`);
  const loginPass = document.getElementById(`autorizationPass`);
  const loginButton = document.getElementById(`login-form-buttonListId`);
  const addForm = document.getElementById(`add-formListId`);

  loginButton.addEventListener(`click`, () => {
    console.log(`34567`);

    return fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login: loginLogin.value,
        password: loginPass.value,
      }),
      // }).catch((error) => {
      //   //addFormButtonIdNew.disabled = false;
      //   throw new Error(`Кажется, у вас сломался интернет, попробуйте позже...`);
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 400)
          throw new Error(`Кажется, у вас не правильный пароль...`);
        else {
          loginForm.classList.add(`view-form`);
          addForm.classList.remove(`view-form`);
          return response.json();
        }
      })
      .then((responseData) => {
        token = responseData.user.token;
        console.log(responseData.user.token);
        userName = responseData.user.name;
        commentName.value = responseData.user.name;
      })
      .catch((error) => {
        alert(`111${error}`);
      });
  });
}
loginFetch();
console.log(token);
//регистрация

function chooseForm() {
  const chooseEnterButton = document.getElementById(
    `choose-enter-buttonListId`
  );
  const chooseRegButton = document.getElementById(`choose-reg-buttonListId`);
  const chooseForm = document.getElementById(`choose-formListId`);
  const loginLogin = document.getElementById(`autorizationLogin`);
  const loginName = document.getElementById(`autorizationName`);
  const loginForm = document.getElementById(`login-formListId`);
  const regButton = document.getElementById(`reg-form-buttonListId`);
  const loginButton = document.getElementById(`login-form-buttonListId`);

  chooseEnterButton.addEventListener(`click`, () => {
    chooseForm.classList.add(`view-form`); //скрываем форму выбора
    loginName.classList.add(`view-form`); //скрываем поле ИМЯ
    loginForm.classList.remove(`view-form`); //открываем форму ВХОДА
    regButton.classList.add(`view-form`); // скрываем кнопку РЕГ
  });
  chooseRegButton.addEventListener(`click`, () => {
    chooseForm.classList.add(`view-form`); // скрываем форму выбора
    loginButton.classList.add(`view-form`); // скрываем кнопку ВХОДА
    loginForm.classList.remove(`view-form`); // открываем форму ВХОДА
  });
}
chooseForm();

function registrationFetch() {
  const loginForm = document.getElementById(`login-formListId`);
  const loginLogin = document.getElementById(`autorizationLogin`);
  const loginPass = document.getElementById(`autorizationPass`);
  const loginButton = document.getElementById(`login-form-buttonListId`);
  const addForm = document.getElementById(`add-formListId`);
  const regButton = document.getElementById(`reg-form-buttonListId`);
  const loginName = document.getElementById(`autorizationName`);
  regButton.addEventListener(`click`, () => {
    console.log(`34567`);

    return fetch("https://wedev-api.sky.pro/api/user", {
      method: "POST",
      body: JSON.stringify({
        login: loginLogin.value,
        name: _.capitalize(loginName.value),
        password: loginPass.value,
      }),
      // }).catch((error) => {
      //   //addFormButtonIdNew.disabled = false;
      //   throw new Error(`Кажется, у вас сломался интернет, попробуйте позже...`);
    })
      .then((response) => {
        console.log(response.status);
        if (
          loginLogin.value === `` ||
          loginName.value === `` ||
          loginPass.value === ``
        )
          alert(`заполните поля ввода`);
        else if (response.status === 400)
          throw new Error(`Вы уже зарегистрированы ранее...`);
        else {
          loginForm.classList.add(`view-form`);
          addForm.classList.remove(`view-form`);
          return response.json();
        }
      })
      .then((responseData) => {
        token = responseData.user.token;
        console.log(responseData.user.token);
        userName = responseData.user.name;
        commentName.value = responseData.user.name;
      })
      .catch((error) => {
        alert(`Внимание ошибка '${error}'`);
      });
  });
}
registrationFetch();
console.log(token);
