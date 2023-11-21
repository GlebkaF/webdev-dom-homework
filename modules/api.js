import { currentDate } from "./utils.js";

export let token = null;
// export let token = localStorage.getItem("token");
// export let userName = localStorage.getItem("user");
// export const getToken = () => {
//   return `Bearer ${token}`;
// };
export const setToken = (newToken) => {
  token = newToken;
};

export let user = "";

export function setUser(newUser) {
  user = newUser;
}

export function getComments() {
  return fetch("https://wedev-api.sky.pro/api/v2/dima-nosov/comments", {
    method: "GET",
  }).then((response) => response.json());
}

export function postComments(userText) {
  userText = userText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return fetch("https://wedev-api.sky.pro/api/v2/dima-nosov/comments", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      text: userText,
    }),
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("The server has failed");
      } else if (response.status === 400) {
        throw new Error("Something went wrong, try to enter again");
      } else {
        return response.json();
      }
    })
    .then((responseData) => {})
    .catch((error) => {
      console.error("Error:", error.message);
    });
}
export function loginUser({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      // token = user.user.token;
      if (response.status === 400) {
        throw new Error("Wrong login or password");
      }
      return response.json();
    })
    .catch((error) => {
      // Обработка ошибки здесь
      console.error(error.message);
      throw error; // Повторно бросаем ошибку для обработки в вызывающем коде
    });
}

export function authorizedUser({ login, password, name }) {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("User is already registered");
    }
    return response.json();
  });
}

export function deleteCommentApi({ id }) {
  return fetch("https://wedev-api.sky.pro/api/v2/dima-nosov/comments/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(response);
    if (response.status === 500) {
      throw new Error("Server is not available");
    } else {
      return response.json();
    }
  });
}
