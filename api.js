const host = "https://wedev-api.sky.pro/api/v2/anastasia-mikheykina/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";
const userUrlReg = "https://wedev-api.sky.pro/api/user";

//важно ,чтобы объявление и функция по переопределению были в одном модуле, тогда при экспорте ошибки с типом(константой) не будет. При импорте переменные становятся константами
export let token = null;
export const setToken = (newToken) => {
  token = newToken;
};
export function getComments() {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((responce) => {
    if (responce.status === 401) {
      throw new Error("Not authorised");
    }
    return responce.json();
  })
}
export function postComment({ text }) {
  return fetch(host,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: text,
      }),
    })
}
export function login({ login, password }) {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 201) {
      console.log("вот страница с комментариями и формой");
      //отрисуй страницу комментариев с формой ввода комментария
      return response.json();
    }
    if (response.status === 400) {
      return Promise.reject("вы ввели не верный логин или пароль");
    }
    if (response.status === 500) {
      return Promise.reject("ошибка сервера");
    }
    return Promise.reject("сервер упал");

  })
    .catch((error) => {
      alert(error);
      //todo:отправлять в систему сбора ошибок??
      console.warn(error);
    })
};



export function register({ login, name, password }) {
  return fetch(userUrlReg, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  }).then((response) => {
    if (response.status === 201) {
      console.log("регистрация прошла успешно");
      //отрисуй страницу комментариев с формой ввода комментария
      return response.json();
    }
    if (response.status === 400) {
      return Promise.reject("пользователь с таким логином уже существует");
    }
    if (response.status === 500) {
      return Promise.reject("ошибка сервера");
    }
    return Promise.reject("сервер упал");

  })
    .catch((error) => {
      alert(error);
      //todo:отправлять в систему сбора ошибок??
      console.warn(error);
    })
};