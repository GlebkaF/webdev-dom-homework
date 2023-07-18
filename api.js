let currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();
let hour = currentDate.getHours();
let minutes= currentDate.getMinutes();

if (day < 10 ) {
  day = '0' + day;
}
if (month < 10 ) {
  month = '0' + month;
}
if (hour < 10 ) {
  hour = '0' + hour;
}
if (minutes < 10 ) {
  minutes = '0' + minutes;
}

const baseURL = "https://wedev-api.sky.pro/api/v2/AnnaIllarionova/comments";
const registerURL = "https://wedev-api.sky.pro/api/user";
const authorizedURL = "https://wedev-api.sky.pro/api/user/login";

export let userName;

export const setUserName = (newUserName) => {
  userName = newUserName;
}

export let token;

export const setToken = (newToken) => {
  token = newToken;
}

export function getComments() {
    return fetch(baseURL, {
    method: "GET",
    headers: {
    //   Authorization: `Bearer ${token}`
    },
    })
    .then((answer) => {
    return answer.json();
    });
}


export function postComments({ text, name }) {
    return fetch(baseURL, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({
    text: text
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;"),
    name: name
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;"),
    date: day + '.' + month + '.' + year + ' ' + hour + ':' + minutes,
    counter: 0,
    isLiked: false,
    isEdit: false,
    forceError: true,
  })
})
.then((response) => {
  if (response.status === 201) {
    return response.json();
  } else if (response.status === 400) {
    throw new Error('Неправильный ввод');
  } else if (response.status === 500) {
    throw new Error('Сервер сломался');
  } else {
    throw new Error('Нет интернета');
  }
})
}

export function repeatPostComments({ text, name }) {
    return fetch(baseURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      text: text
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;"),
      name: name
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;"),
      date: day + '.' + month + '.' + year + ' ' + hour + ':' + minutes,
      counter: 0,
      isLiked: false,
      isEdit: false,
      forceError: false,
    })
  })
  .then((response) => {
    if (response.status === 500) {
      throw new Error('Сервер сломался');
    } else {
      return response.json();
    }
  }); 
}

export function login({ login, password }) {
  return fetch(authorizedURL, {
method: "POST",
body: JSON.stringify({
  login,
  password,
})
})
.then((response) => {
if (response.status === 400) {
  alert("Неправильно введен логин или пароль, попробуйте ещё раз")
  throw new Error('Неправильный ввод');
} 
return response.json();
})
}
