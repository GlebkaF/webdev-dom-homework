import { format } from "date-fns";

const baseURL = "https://wedev-api.sky.pro/api/v2/AnnaIllarionova/comments";
const registerURL = "https://wedev-api.sky.pro/api/user";
const authorizedURL = "https://wedev-api.sky.pro/api/user/login";

export let userName;

export const setUserName = (newUserName) => {
  userName = newUserName;
};

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export function getComments() {
  let headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return fetch(baseURL, {
    method: "GET",
    headers,
  }).then((answer) => {
    return answer.json();
  });
}

export function postComments({ text, name }) {
  const now = new Date();

  const createDate = format(now, "dd-MM-yyyy HH:mm:ss");

  return fetch(baseURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: text.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      name: name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: createDate,
      counter: 0,
      isLiked: false,
      isEdit: false,
      forceError: true,
    }),
  }).then((response) => {
    console.log(createDate);
    if (response.status === 201) {
      return response.json();
    } else if (response.status === 400) {
      throw new Error("Неправильный ввод");
    } else if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else {
      throw new Error("Нет интернета");
    }
  });
}

export function repeatPostComments({ text, name }) {
  return fetch(baseURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: text.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      name: name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: day + "." + month + "." + year + " " + hour + ":" + minutes,
      counter: 0,
      isLiked: false,
      isEdit: false,
      forceError: false,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else {
      return response.json();
    }
  });
}

export function deleteComment({ id }) {
  console.log(id);
  return fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

//берем из API авторизацию
export function login({ login, password }) {
  return fetch(authorizedURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      alert("Неправильно введен логин или пароль, попробуйте ещё раз");
      throw new Error("Неправильный ввод");
    }
    return response.json();
  });
}

//Авторизоваться
export function registerNewUser({ login, name, password }) {
  return fetch(registerURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Пользователь существует");
      }
      return response.json();
    })
    .catch((error) => {
      if (error.message === "Пользователь существует") {
        alert("Пользователь с таким логином уже существует");
      }
    });
}

//берем из Api счетчик лайков
export const toogleLikes = ({ id }) => {
  return fetch(`${baseURL}/${id}/toggle-like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
};
