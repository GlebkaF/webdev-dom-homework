const hostURL = "https://wedev-api.sky.pro/api/v2/Igor-Yurin/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";

export let token;

// функция получения токена
export const setToken = (newToken) => {
  return (token = newToken);
};

export let name;

// функция получения авторизованного имени
export const setLogin = (newLogin) => {
  return (name = newLogin);
};

// "GET" запрос для первой страниц (без авторизации)
export function getCommentsWithoutAuthorization() {
  return fetch(hostURL, {
    // Функцией fetch делаем асинхронный запрос в API и возращаем promise в переменную fetchPromise
    method: "GET",
  }).then((response) => {
    // методом then подписываемся на завершение promise (выполненный запрос или отклоненный запрос (запрос хранится в параметре функции))
    return response.json(); // Возвращаем данные от API и через метод json() преобразовываю в JSON-формат.
  });
}

// "GET" запрос для авторизованной страниц
export function getComments() {
  return fetch(hostURL, {
    // Функцией fetch делаем асинхронный запрос в API и возращаем promise в переменную fetchPromise
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    // методом then подписываемся на завершение promise (выполненный запрос или отклоненный запрос (запрос хранится в параметре функции))
    return response.json(); // Возвращаем данные от API и через метод json() преобразовываю в JSON-формат.
  });
}

export function postComment({ text, name, forceError }) {
  return fetch(hostURL, {
    // Возвращаем promise
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      userName: `Bearer ${name}`,
    },
    body: JSON.stringify({
      text: text,
      name: name,
      forceError: forceError,
    }),
  }).then((response) => {
    // методом then подписываемся на завершение promise (выполненный запрос или отклоненный запрос (запрос хранится в параметре функции))
    return response.json(); // Возвращаем данные от API и через метод json() преобразовываю в JSON-формат.
  });
}

export function login({ login, password }) {
  return fetch(userUrl, {
    // Возвращаем promise
    method: "POST",
    body: JSON.stringify({

      login,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        // Обработка статуса 400
        throw new Error("Сервер сломался");
      }
      return response.json(); // Возвращаем данные от API и через метод json() преобразовываю в JSON-формат.
    })
    .catch((error) => {
      if (error.message === "Сервер сломался") {
        alert("Неверный логин или пароль, попробуйте снова");
      }
    });
}
