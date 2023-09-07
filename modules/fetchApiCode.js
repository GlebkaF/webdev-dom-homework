import { token } from "./variables.js";

export const methodApiGet = () => {
  return fetch("https://wedev-api.sky.pro/api/v2/levchenko5/comments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    });
};

export const methodApiPost = (commitInput, token) => {
  return fetch("https://wedev-api.sky.pro/api/v2/levchenko5/comments", {
    method: "POST",
    body: JSON.stringify({
      text: commitInput.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchForRegPost = ({ login, name, password }) => {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  })
};

export const fetchForAuthPost = ({ login, password }) => {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
};
