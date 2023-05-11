const getComments = () => {
  return fetch(
    "https://webdev-hw-api.vercel.app/api/v1/ramal.bakirov/comments",
    {
      method: "GET",
    }
  ).then((response) => {
    return response.json();
  });
};
function postMethod(nameElements, textElements) {
  return fetch(
    "https://webdev-hw-api.vercel.app/api/v1/ramal.bakirov/comments",
    {
      method: "POST",
      body: JSON.stringify({
        name: nameElements,
        text: textElements,
      }),
    }
  ).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else if (response.status === 400) {
      throw new Error("Короткое имя или текст");
    } else {
      return response.json();
    }
  });
}
const getUsers = (token) => {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    }
    return response.json();
  });
};
function login({login, password}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
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
  });
}
function regUser({login, password, name}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Пользователь уже существует')
    }
    return response.json();
  });
}

export { getComments, postMethod, login, getUsers, regUser };
