const todosURL = "https://wedev-api.sky.pro/api/v2/todos";
const userURL = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export function getTodos() {
  return fetch(todosURL, {
    method: "GET",
    headers: {
      Authorization: 'Bearer ${token}',
    },
  }).then((response) => {
    return response.json();
  });
}

export function deleteTodo({ id }) {
  return fetch('${todosURL}/${id}', {
    method: "DELETE",
    headers: {
      Authorization: 'Bearer ${token}',
    },
  }).then((response) => {
    return response.json();
  });
}

export function postTodo({ text }) {
  return fetch(todosURL, {
    method: "POST",
    headers: {
      Authorization: 'Bearer ${token}',
    },
    body: JSON.stringify({
      text,
    }),
  }).then((response) => {
    return response.json();
  });
}

export function login({ login, password }) {
  return fetch(userURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    return response.json();
  });
}