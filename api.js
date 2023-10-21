import { getFetch } from "./main.js";
import { addComment } from "./rernder.js";
import { renderComments } from "./rernder.js";

//  let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k"
let token = null
export const getToken = () => {
return token;
}
 export const setToken = (newToken) => {
token = newToken

 }


export function getElements() {
  return fetch("https://wedev-api.sky.pro/api/v2/liza-moguchaya/comments", {
    method: "GET"
  })
    .then((response) => response.json())
};
export function showAddForm() {
  const form = document.querySelector(".add-form");
  form.classList.remove("hidden");
  
};
export function hideAddForm() {
  const form = document.querySelector(".add-form");
  form.classList.add("hidden");
};
export function showLoadingIndicatorComments() {
  const loader = document.querySelector(".comment-loader");
  loader.classList.remove("hidden");
};
export function deleteLoadingIndicatorComments() {
  const loader = document.querySelector(".comment-loader");
  loader.classList.add("hidden");

};
export function showLoadingIndicator() {
  const loader = document.querySelector(".list-loader");
  loader.classList.remove("hidden");

};

export function deleteLoadingIndicator() {
  const loader = document.querySelector(".list-loader");
  loader.classList.add("hidden");
};

export function correctDate(date) {
  let currentDate = new Date(date);
  let todayDay = currentDate.getDate();
  let todayMonth = currentDate.getMonth() + 1;
  let todayYear = String(currentDate.getFullYear()).slice(-2);
  let todayHours = currentDate.getHours();
  let todayMinutes = currentDate.getMinutes();
  todayDay = todayDay < 10 ? "0" + todayDay : todayDay;
  todayMonth = todayMonth < 10 ? "0" + todayMonth : todayMonth;
  todayHours = todayHours < 10 ? "0" + todayHours : todayHours;
  todayMinutes = todayMinutes < 10 ? "0" + todayMinutes : todayMinutes;

  let formattedDate = `${todayDay}.${todayMonth}.${todayYear} ${todayHours}:${todayMinutes} `;
  return formattedDate;
};


const buttonElement = document.getElementById("add-button");
const nameElement = document.querySelector('.add-form-name');
const textElement = document.querySelector('.add-form-text');
const listElement = document.getElementById("list");
// const nameInputElement = document.getElementById("name-input");
// const commentInputElement = document.getElementById("comment-input");



export function postElements(text, name) {
  return fetch('https://wedev-api.sky.pro/api/v2/liza-moguchaya/comments', {

    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      text: textElement.value,
      name: nameElement.value
    })


  })

    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер упал, попробуй позже");
      } else if (response.status === 400) {
        throw new Error("Что-то не то, попробуй ввести данные заново");
      } else {
        return response.json();
      };
    })
    .then((responseData) => {

      deleteLoadingIndicatorComments();
      showAddForm();
      nameElement.value = "";
      textElement.value = "";
      getFetch();
      deleteLoadingIndicator();
    })
    .catch((error) => {
      showAddForm();
      deleteLoadingIndicatorComments();
      buttonElement.disabled = false;
      alert(error.message);
    });


};


export function loginUser({ login, password }) {

  return fetch('https://wedev-api.sky.pro/api/user/login', {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Неверный логин или пароль')
    }
    return response.json();
  })
};

export function autorizatedUser({ login, password, name }) {

  return fetch('https://wedev-api.sky.pro/api/user', {
    method: "POST",
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Такой пользователь уже существует')
    }
    return response.json();
  });
};



