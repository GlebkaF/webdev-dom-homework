const todosUrl = "https://wedev-api.sky.pro/api/v2/yulenka/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";
const regUserUrl = "https://wedev-api.sky.pro/api/user";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export function getTodos() {
  return fetch(todosUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function postTodo({ name, text }) {
  return fetch(todosUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      text: text,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер сломался");
      // return Promise.reject('Сервер сломался');
    }
    if (response.status === 400) {
      throw new Error("Плохой запрос");
      // return Promise.reject('Плохой запрос');
    } else {
      return response.json();
    }
  });
}

export function login({ login, password }) {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error("Неверно введено имя или пароль");
      }
    })
    .catch((error) => {
      if (error.message === "Неверно введено имя или пароль") {
        alert("Неверно введено имя или пароль");
      }
    });
}

export function regLogin({ name, login, password }) {
  return fetch(regUserUrl, {
    method: "POST",
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error("пользователь с таким логином уже сущетсвует");
      }
    })
    .catch((error) => {
      if (error.message === "Неверно введено имя или пароль") {
        alert("Неверно введено имя или пароль");
      }
    });
}
