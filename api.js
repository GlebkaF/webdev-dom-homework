export let token;

export const setToken = (newToken) => {
  token = newToken;
}

export let UserName;

export const setUserName = (newUserName) => {
  UserName = newUserName;
}


export function getTodos() {
  return fetch("https://wedev-api.sky.pro/api/v2/skorik-marina/comments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    });
}

export function postTodo({ name, text }) {
  return fetch("https://wedev-api.sky.pro/api/v2/skorik-marina/comments", {
    method: "POST",
    body: JSON.stringify({
      name: name
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      text: text
        // .replace(`"${quote}"\n`, "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      // forceError: true,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 400) {
        alert('Имя и текст должны быть длиннее 3-х символов!');
        return Promise.reject(new Error("Не верный пользовательский ввод"));
      } else if (response.status === 500) {
        return Promise.reject(new Error("Сервер упал"));
      }
    })
}

export function login({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Не верный логин или пароль");
      };
      return response.json();
    })
}

export function UserRegistration({ login, name, password }) {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Повторяется имя");
      };
      return response.json();
    })
}
